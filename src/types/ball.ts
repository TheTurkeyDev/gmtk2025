export type Ball = {
    x: number,
    y: number,
    size: number,
    vx: number,
    vy: number,
    isMoving: boolean,
    color: string
}

export function drawBall(ball: Ball, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.strokeStyle = ball.isMoving ? '#ccc' : '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
}