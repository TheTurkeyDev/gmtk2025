export type Hole = {
    id: string
    x: number,
    y: number,
    size: number,
}

export function drawHole(hole: Hole, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, hole.size, 0, 2 * Math.PI);
    ctx.fillStyle = '#ddd';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.beginPath();
    ctx.fillRect(hole.x - 2, hole.y - 9, 4, 5);
    ctx.fillRect(hole.x - 2, hole.y + 4, 4, 5);
    ctx.fillRect(hole.x - 9, hole.y - 2, 5, 4);
    ctx.fillRect(hole.x + 4, hole.y - 2, 5, 4);
}