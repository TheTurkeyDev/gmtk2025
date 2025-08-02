import { gameSettings } from '../game/game-info';
import type { Ball } from '../types/ball';
import type { Position } from '../types/position';
import type { Wall } from '../types/wall';

export function checkContinuousWallCollisions(walls: Wall[], ball: Ball, newX: number, newY: number) {
    let closestCollision: { contactX: number, contactY: number } = { contactX: -1, contactY: -1 };
    let closestTime = Infinity;

    const cWalls = walls.filter(wall => {
        const collision = getMovingCircleLineCollision(
            ball.x, ball.y, newX, newY, ball.size,
            wall.x1, wall.y1, wall.x2, wall.y2
        );

        if (collision && collision.time < closestTime) {
            closestTime = collision.time;
            closestCollision = collision;
            return true;
        }

        return false;
    });

    if (cWalls.length > 1)
        //This is not a real solution, but it prevents the ball from going out of play?
        return {
            x: closestCollision.contactX - ball.vx, // Push slightly away from wall
            y: closestCollision.contactY - ball.vy,
            vx: -ball.vx,
            vy: -ball.vy
        };

    const wall = cWalls.length > 0 ? cWalls[0] : undefined;
    if (wall) {
        // Calculate wall normal
        const wallDx = wall.x2 - wall.x1;
        const wallDy = wall.y2 - wall.y1;
        const wallLength = Math.sqrt(wallDx * wallDx + wallDy * wallDy);

        // Normal vector pointing away from wall
        let normalX = -wallDy / wallLength;
        let normalY = wallDx / wallLength;

        // Make sure normal points away from the wall (toward old position)
        const toOldX = ball.x - closestCollision.contactX;
        const toOldY = ball.y - closestCollision.contactY;
        if (normalX * toOldX + normalY * toOldY < 0) {
            normalX = -normalX;
            normalY = -normalY;
        }

        // Reflect velocity
        const dotProduct = ball.vx * normalX + ball.vy * normalY;
        const reflectedVx = ball.vx - 2 * dotProduct * normalX;
        const reflectedVy = ball.vy - 2 * dotProduct * normalY;


        // Normalize velocity vector
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        const unitVx = ball.vx / speed;
        const unitVy = ball.vy / speed;

        // Impact severity based on angle to wall normal
        // Between 0 and 1
        const impactAngle = Math.abs(unitVx * normalX + unitVy * normalY);

        // Glancing hit (almost full energy retained)
        const minLoss = 0.95;

        // Direct hit
        const maxLoss = gameSettings.wallEnergyLoss;
        const energyLossFactor = minLoss + (maxLoss - minLoss) * impactAngle;

        return {
            x: closestCollision.contactX + normalX * (ball.size + 0.1), // Push slightly away from wall
            y: closestCollision.contactY + normalY * (ball.size + 0.1),
            vx: reflectedVx * energyLossFactor,
            vy: reflectedVy * energyLossFactor
        };
    }

    return null;
}

function getMovingCircleLineCollision(x1: number, y1: number, x2: number, y2: number, radius: number, lineX1: number, lineY1: number, lineX2: number, lineY2: number) {
    // Movement vector
    const dx = x2 - x1;
    const dy = y2 - y1;

    // Line segment vector
    const lineDx = lineX2 - lineX1;
    const lineDy = lineY2 - lineY1;
    const lineLength = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

    if (lineLength === 0) return null;

    // Normalize line direction
    const lineUnitX = lineDx / lineLength;
    const lineUnitY = lineDy / lineLength;

    // Expand the line by the circle's radius (create a "capsule")
    // We need to check collision with the expanded line segment

    let closestTime = Infinity;
    let collisionPoint: Position | null = null;
    let contactPoint: Position | null = null;

    // Check collision with the main line segment (expanded by radius)

    for (let step = 0; step <= 100; step++) {
        const t = step / 100;
        const checkX = x1 + dx * t;
        const checkY = y1 + dy * t;

        // Find closest point on line segment to current ball position
        const toStartX = checkX - lineX1;
        const toStartY = checkY - lineY1;
        const projection = Math.max(0, Math.min(lineLength, toStartX * lineUnitX + toStartY * lineUnitY));

        const closestX = lineX1 + lineUnitX * projection;
        const closestY = lineY1 + lineUnitY * projection;

        const distX = checkX - closestX;
        const distY = checkY - closestY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance <= radius && t < closestTime) {
            closestTime = t;
            collisionPoint = { x: checkX, y: checkY };
            contactPoint = { x: closestX, y: closestY };
        }
    }

    if (collisionPoint && contactPoint) {
        return {
            time: closestTime,
            x: collisionPoint.x,
            y: collisionPoint.y,
            contactX: contactPoint.x,
            contactY: contactPoint.y,
            wallX1: lineX1,
            wallY1: lineY1,
            wallX2: lineX2,
            wallY2: lineY2
        };
    }

    return null;
}

export function circleIntersectsLine(circleX: number, circleY: number, radius: number, x1: number, y1: number, x2: number, y2: number) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const fx = circleX - x1;
    const fy = circleY - y1;

    const lengthSquared = dx * dx + dy * dy;
    if (lengthSquared === 0)
        return Math.sqrt(fx * fx + fy * fy) <= radius;

    const t = Math.max(0, Math.min(1, (fx * dx + fy * dy) / lengthSquared));
    const closestX = x1 + t * dx;
    const closestY = y1 + t * dy;
    return Math.sqrt(Math.pow(circleX - closestX, 2) + Math.pow(circleY - closestY, 2)) <= radius;
}

export function pointInPolygon(x: number, y: number, polygon: Position[]) {
    let inside = false;

    //ngl, ai recommended this loop definition and it's kinda cool, but no chance I would have come up with it
    //j simply is the index before i
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x;
        const yi = polygon[i].y;
        const xj = polygon[j].x;
        const yj = polygon[j].y;

        if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi))
            inside = !inside;
    }

    return inside;
}