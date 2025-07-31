import { gameSettings, playerInfo } from './game-info';
import { checkContinuousWallCollisions, circleIntersectsLine } from './phys/phys-helper';
import { loadRoomData } from './rooms/rooms-manager';
import { drawBall, type Ball } from './types/ball';
import { drawCoin } from './types/coin';
import { drawHole } from './types/hole';
import type { Position } from './types/position';
import type { Room } from './types/room';
import { drawWall } from './types/wall';

/** === Elements === */
const canvas = document.getElementById("game") as HTMLCanvasElement | undefined;
const ctx = canvas?.getContext('2d');

let lastRender = 0;

// const room: Position = { x: 0, y: 0 };
const ball: Ball = { x: 100, y: 100, size: 5, vx: 0, vy: 0, isMoving: false, color: '#0fffff' };
let room: Room | null = null;

let roomChanging = false;
let roomOffset: Position = { x: 0, y: 0 };
let roomOffsetDir: Position = { x: 0, y: 0 };
let nextRoom: Room | null = null;

let isDragging = false;
let mCurr = { x: -1, y: -1 }


/** === Events === */
canvas?.addEventListener('mousedown', event => {
    if (ball.isMoving)
        return;

    const rect = canvas.getBoundingClientRect();
    const mX = event.clientX - rect.left;
    const mY = event.clientY - rect.top;
    if (isClickOnBall(mX, mY)) {
        isDragging = true;
        mCurr = { x: mX, y: mY };
        canvas.style.cursor = 'grabbing';
    }
});

canvas?.addEventListener('mousemove', event => {
    if (!isDragging)
        return;

    const rect = canvas.getBoundingClientRect();
    mCurr = { x: event.clientX - rect.left, y: event.clientY - rect.top };
});

canvas?.addEventListener('mouseup', () => {
    if (!isDragging)
        return;

    const shotInfo = calcShotInfo();
    ball.vx = -Math.cos(shotInfo.angle) * shotInfo.power * gameSettings.maxDragDist * gameSettings.shotStrength;
    ball.vy = -Math.sin(shotInfo.angle) * shotInfo.power * gameSettings.maxDragDist * gameSettings.shotStrength;

    ball.isMoving = true;
    playerInfo.strokesLeft -= 1;

    isDragging = false;
    canvas.style.cursor = 'crosshair';
});

// Prevent context menu on right click
canvas?.addEventListener('contextmenu', event => event.preventDefault());

/** === Logic === */

function loop(timestamp: number) {
    render();
    update((timestamp - lastRender) / 1000);
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

function render() {
    if (!ctx || !room)
        return;

    ctx.fillStyle = '#1c6c1cff';
    ctx.fillRect(0, 0, canvas?.width ?? 1, canvas?.height ?? 1);

    ctx.fillStyle = '#00000074';
    ctx.fillRect(0, 0, canvas?.width ?? 1, 40);

    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.font = `18px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`STROKES: ${playerInfo.strokesLeft}`, 250, 20);

    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.font = `18px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`COINS: ${playerInfo.coins}`, 950, 20);

    ctx.save();
    if (roomChanging)
        ctx.translate(roomOffset.x, roomOffset.y);
    renderRoom(ctx, room, !roomChanging)
    ctx.restore();

    if (roomChanging && nextRoom && canvas) {
        ctx.save();
        ctx.translate(
            roomOffset.x + (roomOffsetDir.x > 0 ? -canvas.width : (roomOffsetDir.x < 0 ? canvas.width : 0)),
            roomOffset.y + (roomOffsetDir.y > 0 ? -canvas.height : (roomOffsetDir.y < 0 ? canvas.height : 0))
        );
        renderRoom(ctx, nextRoom, true)
        ctx.restore();
    }
}

function renderRoom(ctx: CanvasRenderingContext2D, room: Room, renderBall: boolean) {
    //Walls
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    room.walls.forEach(wall => drawWall(wall, ctx));

    // Holes
    room.holes.forEach(hole => drawHole(hole, ctx));

    // Coins
    room.coins.forEach(coin => drawCoin(coin, ctx));


    // Aim/ Power line
    // Draw aim line when dragging
    if (isDragging) {
        const shotInfo = calcShotInfo();

        // Calculate clamped drag vector
        const dragX = mCurr.x - ball.x;
        const dragY = mCurr.y - ball.y;
        const dragDistance = Math.sqrt(dragX * dragX + dragY * dragY);

        // Clamp to max distance
        const clampedDistance = Math.min(dragDistance, gameSettings.maxDragDist * gameSettings.shotStrength);
        const clampedDragX = dragDistance > 0 ? (dragX / dragDistance) * clampedDistance : 0;
        const clampedDragY = dragDistance > 0 ? (dragY / dragDistance) * clampedDistance : 0;

        // console.log(clampedDragX, clampedDragY);

        // Draw power indicator (opposite direction of clamped drag)
        const oppositeX = ball.x - clampedDragX;
        const oppositeY = ball.y - clampedDragY;

        // Color based on power level
        const powerColor = shotInfo.power < 0.3 ? '#00ff00' :
            shotInfo.power < 0.7 ? '#ffff00' : '#ff0000';

        ctx.strokeStyle = powerColor;
        ctx.lineWidth = Math.max(2, shotInfo.power * 6);
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(oppositeX, oppositeY);
        ctx.stroke();

        // Draw max distance circle when at full power
        if (shotInfo.power >= 1.0) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, gameSettings.maxDragDist * gameSettings.shotStrength, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }

    // Ball
    if (renderBall)
        drawBall(ball, ctx);
}

function update(delta: number) {
    if (!canvas)
        return;

    if (roomChanging) {
        roomOffset.x += roomOffsetDir.x * delta;
        roomOffset.y += roomOffsetDir.y * delta;
        if (Math.abs(roomOffset.x) - canvas.width >= 0 || Math.abs(roomOffset.y) - canvas.height >= 0) {
            roomChanging = false;
            room = nextRoom;
        }
        return;
    }

    if (!ball.isMoving)
        return;

    // Calculate new position
    const newX = ball.x + ball.vx * delta * 60;
    const newY = ball.y + ball.vy * delta * 60;

    const toCollect = room?.coins?.filter(c => circleIntersectsLine(c.x, c.y, c.size, ball.x, ball.y, newX, newY));

    if (toCollect && toCollect.length > 0 && room) {
        toCollect.forEach(c => {
            if (c.type === 0)
                playerInfo.coins += 1;
            else if (c.type === 1)
                playerInfo.coins += 5;
        })

        room.coins = room.coins.filter(c => !toCollect.find(cc => cc.x === c.x && cc.y === c.y));
    }

    // Check for wall collisions along the movement path
    const collision = checkContinuousWallCollisions(room?.walls ?? [], ball, newX, newY);

    if (collision) {
        // Move ball to collision point
        ball.x = collision.x;
        ball.y = collision.y;

        // Apply collision response
        ball.vx = collision.vx;
        ball.vy = collision.vy;
    } else {
        // No collision, move normally
        ball.x = newX;
        ball.y = newY;
    }

    const frictionRate = 60.0;
    const frictionFactor = Math.pow(gameSettings.friction, frictionRate * delta);
    ball.vx *= frictionFactor;
    ball.vy *= frictionFactor;

    // Bounce off walls
    if (ball.x - ball.size <= 0 || ball.x + ball.size >= canvas.width) {
        ball.vx *= gameSettings.wallEnergyLoss;
        ball.x = Math.max(ball.size, Math.min(canvas.width - ball.size, ball.x));
    }
    if (ball.y - ball.size <= 0 || ball.y + ball.size >= canvas.height) {
        ball.vy *= gameSettings.wallEnergyLoss;
        ball.y = Math.max(ball.size, Math.min(canvas.height - ball.size, ball.y));
    }

    room?.holes?.forEach(hole => {
        const distToHole = Math.sqrt(
            Math.pow(hole.x - ball.x, 2) + Math.pow(hole.y - ball.y, 2)
        );
        const hr = (hole.size - (ball.size / 2));
        if (distToHole < hr) {
            ball.vx = 0;
            ball.vy = 0;
            ball.isMoving = false;
            roomChanging = true;
            roomOffset = { x: 0, y: 0 };
            switch (hole.id) {
                case 'left':
                    roomOffsetDir = { x: gameSettings.roomChangeSpeed, y: 0 };
                    nextRoom = loadRoomData(-1, 0);
                    ball.x = 900;
                    ball.y = 350;
                    break;
                case 'right':
                    roomOffsetDir = { x: -gameSettings.roomChangeSpeed, y: 0 };
                    nextRoom = loadRoomData(0, 0);
                    ball.x = 150;
                    ball.y = 350;
                    break;
                case 'top':
                    roomOffsetDir = { x: 0, y: gameSettings.roomChangeSpeed };
                    nextRoom = loadRoomData(-1, 0);
                    break;
                case 'bot':
                    roomOffsetDir = { x: 0, y: -gameSettings.roomChangeSpeed };
                    nextRoom = loadRoomData(-1, 0);
                    break;
            }
        }
        else if (distToHole < hole.size) {
            const dx = hole.x - ball.x;
            const dy = hole.y - ball.y;
            const mag = Math.sqrt(dx * dx + dy * dy);
            const nx = dx / mag;
            const ny = dy / mag;

            //TODO: This needs to scale better
            ball.vx += nx;
            ball.vy += ny;
        }
    })

    if (Math.abs(ball.vx) < 0.1 && Math.abs(ball.vy) < 0.1) {
        ball.vx = 0;
        ball.vy = 0;
        ball.isMoving = false;
        if (playerInfo.strokesLeft <= 0) {
            resetToStart()
        }
    }
}

function isClickOnBall(mX: number, mY: number) {
    const distance = Math.sqrt(Math.pow(mX - ball.x, 2) + Math.pow(mY - ball.y, 2));
    return distance <= ball.size;
}

function calcShotInfo() {
    const dx = mCurr.x - ball.x;
    const dy = mCurr.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // from 0 to 1
    const power = Math.min(distance / (gameSettings.maxDragDist * gameSettings.shotStrength), 1);
    const angle = Math.atan2(dy, dx);
    return { power, angle, distance };
}

function initGame() {
    resetToStart();
}

function resetToStart() {
    const newRoom = loadRoomData(0, 0);
    if (newRoom)
        room = newRoom;

    ball.x = 100;
    ball.y = 100;
    ball.vx = 0;
    ball.vy = 0;
    ball.isMoving = false;
    playerInfo.strokesLeft = 10;
}

initGame();
window.requestAnimationFrame(loop);