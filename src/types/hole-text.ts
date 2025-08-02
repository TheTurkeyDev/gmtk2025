export type HoleText = {
    text: string,
    x: number,
    y: number,
    size: number
}

export function drawHomeText(text: HoleText, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.font = `${text.size}px "Libre Baskerville"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.text, text.x, text.y);
}