export class TextEffect {
    private text: string;
    private x: number;
    private y: number;
    private ttl: number;
    private lived: number = 0;

    constructor(text: string, x: number, y: number, ttl: number) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.ttl = ttl;
    }

    render(ctx: CanvasRenderingContext2D) {
        const percent = this.lived / this.ttl;
        const alpha = Math.max(Math.floor((1 - percent) * 255), 0);
        const alphaText = alpha.toString(16);
        ctx.beginPath();
        ctx.fillStyle = `#ffffff${alphaText.length < 2 ? `0${alphaText}`: alphaText}`;
        ctx.font = '12px "Libre Baskerville"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x, this.y - (30 * percent));
    }

    update(delta: number) {
        this.lived += delta;
    }

    done() {
        return this.lived >= this.ttl;
    }
}