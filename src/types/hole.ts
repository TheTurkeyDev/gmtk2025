import { gameSettings } from '../game/game-info';

export type CourseHoleId = {
    courseId: number,
    holeNum: number
}


export type Hole = {
    nextHole: CourseHoleId
    x: number,
    y: number,
    size: number,
    coins: number,
}

export function drawHole(hole: Hole, ctx: CanvasRenderingContext2D) {
    const size = hole.size + gameSettings.holeSizeInc;
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, size, 0, 2 * Math.PI);
    ctx.fillStyle = '#ddd';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = size / 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, size / 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.beginPath();
    const width = size / 2.5;
    const length = size / 2;
    ctx.fillRect(hole.x - (width / 2), hole.y - ((length * 2) - 1), width, length);
    ctx.fillRect(hole.x - (width / 2), hole.y + width, width, length);
    ctx.fillRect(hole.x - ((length * 2) - 1), hole.y - (width / 2), length, width);
    ctx.fillRect(hole.x + width, hole.y - (width / 2), length, width);
}