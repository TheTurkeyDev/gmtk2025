export class Button {
    x: number;
    y: number;
    width: number;
    height: number;
    backgroundColor: string;
    text: string;
    textColor: string;
    textSize: number;
    onClick: () => void;

    constructor(x: number, y: number, width: number, height: number, backgroundColor: string, text: string, textColor: string, textSize: number, onClick: () => void) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.text = text;
        this.textColor = textColor;
        this.textSize = textSize;
        this.onClick = onClick;
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = this.backgroundColor;
        ctx.roundRect(this.x, this.y, this.width, this.height, 5);
        ctx.fill();
        ctx.fillStyle = this.textColor;
        ctx.font = `${this.textSize}px "Libre Baskerville"`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(this.text, this.x + (this.width / 2), this.y + (this.textSize * 0.9));
    }

    public contains(event: MouseEvent, canvas: HTMLCanvasElement) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
    }
}