export type Wall = { x1: number, y1: number, x2: number, y2: number }

export function drawWall(wall: Wall, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(wall.x1, wall.y1);
    ctx.lineTo(wall.x2, wall.y2);
    ctx.stroke();
}