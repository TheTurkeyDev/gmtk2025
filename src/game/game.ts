import { gameSettings, playerInfo, resetGameSettings } from './game-info';
import { checkContinuousWallCollisions, circleIntersectsLine, pointInPolygon } from '../phys/phys-helper';
import { loadCourseHole } from '../course-holes/holes-manager';
import { drawBall, type Ball } from '../types/ball';
import { drawCoin } from '../types/coin';
import { drawHole, type CourseHoleId } from '../types/hole';
import type { Position } from '../types/position';
import type { CourseHole } from '../types/room';
import { drawSandTrap } from '../types/sand-trap';
import { drawWall } from '../types/wall';
import { drawWaterHazard } from '../types/water-hazard';
import { openUI } from '../main';
import { ShopUI } from '../ui/shop-ui';
import { coinPickupSound, golfBallInHoleSound, golfBallWaterSound, golfPuttSound } from '../audio/sounds';
import { drawHomeText } from '../types/hole-text';

export class Game {
    ballLastHitPos: Position = { x: 0, y: 0 };
    ball: Ball = { x: 100, y: 100, size: 5, vx: 0, vy: 0, isMoving: false, color: '#0fffff' };
    courseHole: CourseHole | null = null;
    courseHoleId: CourseHoleId = { courseId: -1, holeNum: -1 };

    roomChanging = false;
    roomOffset: Position = { x: 0, y: 0 };
    roomOffsetDir: Position = { x: 0, y: 0 };
    nextRoom: CourseHole | null = null;

    isDragging = false;
    mCurr = { x: -1, y: -1 };

    public mouseDown(event: MouseEvent, canvas: HTMLCanvasElement) {
        if (this.ball.isMoving)
            return;

        const rect = canvas.getBoundingClientRect();
        const mX = event.clientX - rect.left;
        const mY = event.clientY - rect.top;
        if (this.isClickOnBall(mX, mY)) {
            this.isDragging = true;
            this.mCurr = { x: mX, y: mY };
            canvas.style.cursor = 'grabbing';
        }
    }

    public mouseUp(_: MouseEvent, canvas: HTMLCanvasElement) {
        if (!this.isDragging)
            return;

        const shotInfo = this.calcShotInfo();
        this.ball.vx = -Math.cos(shotInfo.angle) * shotInfo.power * gameSettings.shotStrength;
        this.ball.vy = -Math.sin(shotInfo.angle) * shotInfo.power * gameSettings.shotStrength;

        this.ball.isMoving = true;
        this.ballLastHitPos.x = this.ball.x;
        this.ballLastHitPos.y = this.ball.y;
        if (this.courseHoleId.courseId !== -1)
            playerInfo.strokesLeft -= 1;

        this.isDragging = false;
        canvas.style.cursor = 'crosshair';
        golfPuttSound.play();
    }

    public mouseMove(event: MouseEvent, canvas: HTMLCanvasElement) {
        if (!this.isDragging)
            return;

        const rect = canvas.getBoundingClientRect();
        this.mCurr = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    public render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, timestamp: number) {
        if (!this.courseHole)
            return;

        ctx.fillStyle = '#1c6c1cff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00000074';
        ctx.fillRect(0, 0, canvas.width, 40);

        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px "Libre Baskerville"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`STROKES: ${playerInfo.strokesLeft}`, 250, 20);

        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px "Libre Baskerville"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`COINS: ${playerInfo.coins}`, 950, 20);

        ctx.save();
        if (this.roomChanging)
            ctx.translate(this.roomOffset.x, this.roomOffset.y);
        this.renderRoom(ctx, timestamp, this.courseHole, !this.roomChanging);
        ctx.restore();

        if (this.roomChanging && this.nextRoom) {
            ctx.save();
            ctx.translate(
                this.roomOffset.x + (this.roomOffsetDir.x > 0 ? -canvas.width : (this.roomOffsetDir.x < 0 ? canvas.width : 0)),
                this.roomOffset.y + (this.roomOffsetDir.y > 0 ? -canvas.height : (this.roomOffsetDir.y < 0 ? canvas.height : 0))
            );
            this.renderRoom(ctx, timestamp, this.nextRoom, true);
            ctx.restore();
        }
    }

    renderRoom(ctx: CanvasRenderingContext2D, timestamp: number, cHole: CourseHole, renderBall: boolean) {

        //Tee Box
        ctx.fillStyle = '#0b4b0bff';
        ctx.fillRect(cHole.teeBox.x - 15, cHole.teeBox.y - 15, 30, 30);

        //Sand Traps
        cHole.sand.forEach(sand => drawSandTrap(sand, ctx));

        //Water Hazards
        cHole.water.forEach(water => drawWaterHazard(water, ctx, timestamp));

        //Walls
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        cHole.walls.forEach(wall => drawWall(wall, ctx));

        // Hole Text
        cHole.text.forEach(txt => drawHomeText(txt, ctx));

        // Holes
        cHole.holes.forEach(hole => drawHole(hole, ctx));

        // Coins
        cHole.coins.forEach(coin => drawCoin(coin, ctx));


        // Aim/ Power line
        // Draw aim line when dragging
        if (this.isDragging) {
            const shotInfo = this.calcShotInfo();

            // Calculate clamped drag vector
            const dragX = this.mCurr.x - this.ball.x;
            const dragY = this.mCurr.y - this.ball.y;
            const dragDistance = Math.sqrt(dragX * dragX + dragY * dragY);

            // Clamp to max distance
            const clampedDistance = Math.min(dragDistance, gameSettings.maxDragDist);
            const clampedDragX = dragDistance > 0 ? (dragX / dragDistance) * clampedDistance : 0;
            const clampedDragY = dragDistance > 0 ? (dragY / dragDistance) * clampedDistance : 0;

            // Draw power indicator (opposite direction of clamped drag)
            const oppositeX = this.ball.x - clampedDragX;
            const oppositeY = this.ball.y - clampedDragY;

            // Color based on power level
            const powerColor = shotInfo.power < 0.3 ? '#00ff00' :
                shotInfo.power < 0.7 ? '#ffff00' : '#ff0000';

            ctx.strokeStyle = powerColor;
            ctx.lineWidth = Math.max(2, shotInfo.power * 6);
            ctx.beginPath();
            ctx.moveTo(this.ball.x, this.ball.y);
            ctx.lineTo(oppositeX, oppositeY);
            ctx.stroke();

            // Draw max distance circle when at full power
            if (shotInfo.power >= 1.0) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(this.ball.x, this.ball.y, gameSettings.maxDragDist, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }

        // Ball
        if (renderBall)
            drawBall(this.ball, ctx);
    }

    update(delta: number, width: number, height: number) {
        if (this.roomChanging) {
            this.roomOffset.x += this.roomOffsetDir.x * delta;
            this.roomOffset.y += this.roomOffsetDir.y * delta;
            if (Math.abs(this.roomOffset.x) - width >= 0 || Math.abs(this.roomOffset.y) - height >= 0) {
                this.roomChanging = false;
                this.courseHole = this.nextRoom;
            }
            return;
        }

        if (!this.ball.isMoving)
            return;

        // Calculate new position
        const newX = this.ball.x + this.ball.vx * delta * 60;
        const newY = this.ball.y + this.ball.vy * delta * 60;

        const toCollect = this.courseHole?.coins?.filter(c => circleIntersectsLine(c.x, c.y, c.size, this.ball.x, this.ball.y, newX, newY));

        if (toCollect && toCollect.length > 0 && this.courseHole) {
            toCollect.forEach(c => {
                if (c.type === 0)
                    playerInfo.coins += 1;
                else if (c.type === 1)
                    playerInfo.coins += 5;
            });

            this.courseHole.coins = this.courseHole.coins.filter(c => !toCollect.find(cc => cc.x === c.x && cc.y === c.y));
            if (!coinPickupSound.paused)
                coinPickupSound.currentTime = 0;
            coinPickupSound.play();
        }

        // Check for wall collisions along the movement path
        const collision = checkContinuousWallCollisions(this.courseHole?.walls ?? [], this.ball, newX, newY);

        if (collision) {
            // Move ball to collision point
            this.ball.x = collision.x;
            this.ball.y = collision.y;

            // Apply collision response
            this.ball.vx = collision.vx;
            this.ball.vy = collision.vy;
        } else {
            // No collision, move normally
            this.ball.x = newX;
            this.ball.y = newY;
        }

        const inWaterHazard = this.courseHole?.water?.some(w => pointInPolygon(this.ball.x, this.ball.y, w.points)) ?? false;

        if (inWaterHazard) {
            golfBallWaterSound.play();
            this.ball.x = this.ballLastHitPos.x;
            this.ball.y = this.ballLastHitPos.y;
            this.ball.vx = 0;
            this.ball.vy = 0;
            this.ball.isMoving = false;
            playerInfo.strokesLeft -= 1;
            this.checkStrokes();
        }

        const inSandTrap = this.courseHole?.sand?.some(s => pointInPolygon(this.ball.x, this.ball.y, s.points)) ?? false;

        const frictionRate = 60.0;
        const frictionFactor = Math.pow(inSandTrap ? gameSettings.sandFriction : gameSettings.friction, frictionRate * delta);
        this.ball.vx *= frictionFactor;
        this.ball.vy *= frictionFactor;

        // Bounce off walls
        if (this.ball.x - this.ball.size <= 0 || this.ball.x + this.ball.size >= width) {
            this.ball.vx *= -gameSettings.wallEnergyLoss;
            this.ball.x = Math.max(this.ball.size, Math.min(width - this.ball.size, this.ball.x));
        }
        if (this.ball.y - this.ball.size <= 0 || this.ball.y + this.ball.size >= height) {
            this.ball.vy *= -gameSettings.wallEnergyLoss;
            this.ball.y = Math.max(this.ball.size, Math.min(height - this.ball.size, this.ball.y));
        }

        this.courseHole?.holes?.forEach(hole => {
            const distToHole = Math.sqrt(Math.pow(hole.x - this.ball.x, 2) + Math.pow(hole.y - this.ball.y, 2));
            const holeSize = hole.size + gameSettings.holeSizeInc;
            const hr = (holeSize - (this.ball.size / 2));
            if (distToHole < hr) {
                playerInfo.coins += hole.coins;
                golfBallInHoleSound.play();
                this.ball.vx = 0;
                this.ball.vy = 0;
                this.ball.isMoving = false;
                if (playerInfo.strokesLeft > 0)
                    this.moveToCourseHole(hole.nextHole);
            }
            else if (distToHole < holeSize) {
                const dx = hole.x - this.ball.x;
                const dy = hole.y - this.ball.y;
                const mag = Math.sqrt(dx * dx + dy * dy);
                const nx = dx / mag;
                const ny = dy / mag;

                //TODO: This needs to scale better
                this.ball.vx += nx;
                this.ball.vy += ny;
            }
        });

        if (Math.abs(this.ball.vx) < 0.1 && Math.abs(this.ball.vy) < 0.1) {
            this.ball.vx = 0;
            this.ball.vy = 0;
            this.ball.isMoving = false;
            this.checkStrokes();
        }
    }

    checkStrokes() {
        if (playerInfo.strokesLeft <= 0) {
            this.resetToStart();
            openUI(new ShopUI());
        }
    }

    isClickOnBall(mX: number, mY: number) {
        const distance = Math.sqrt(Math.pow(mX - this.ball.x, 2) + Math.pow(mY - this.ball.y, 2));
        return distance <= this.ball.size;
    }

    calcShotInfo() {
        const dx = this.mCurr.x - this.ball.x;
        const dy = this.mCurr.y - this.ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // from 0 to 1
        const power = Math.min(distance / gameSettings.maxDragDist, 1);
        const angle = Math.atan2(dy, dx);
        return { power, angle, distance };
    }

    initGame() {
        resetGameSettings();
        this.resetToStart();
    }

    moveToCourseHole(nextHole: CourseHoleId) {
        this.roomChanging = true;
        this.roomOffset = { x: 0, y: 0 };
        this.roomOffsetDir = { x: -gameSettings.roomChangeSpeed, y: 0 };
        this.nextRoom = loadCourseHole(nextHole.courseId, nextHole.holeNum);
        this.courseHoleId = { courseId: nextHole.courseId, holeNum: nextHole.holeNum };
        this.ball.x = this.nextRoom?.teeBox.x ?? 0;
        this.ball.y = this.nextRoom?.teeBox.y ?? 0;
    }

    resetToStart() {
        const newRoom = loadCourseHole(0, 0);
        this.courseHoleId = { courseId: -1, holeNum: -1 };
        // const newRoom = loadCourseHole(1, 4);
        // this.courseHoleId = { courseId: 1, holeNum: 4 };
        if (newRoom)
            this.courseHole = newRoom;

        this.ball.x = newRoom?.teeBox?.x ?? 0;
        this.ball.y = newRoom?.teeBox?.y ?? 0;
        this.ball.vx = 0;
        this.ball.vy = 0;
        this.ball.isMoving = false;
        playerInfo.strokesLeft = playerInfo.totalStrokes;
    }
}