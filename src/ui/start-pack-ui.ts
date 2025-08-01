import { gameSettings, resetGameSettings, resetPlayerInfo } from '../game/game-info';
import { closeUI } from '../main';
import { BoundingBox } from '../types/bounding-box';
import type { UI } from './ui-type';

class Pack {
    id: number;
    name: string;
    text: string[];
    boundingBox: BoundingBox;

    constructor(id: number, name: string, text: string[], boundingBox: BoundingBox) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.boundingBox = boundingBox;
    }
}

export class StartPackUI implements UI {

    packs: Pack[] = [
        new Pack(0, 'STANDARD', [
            '- Default Game Start'
        ], new BoundingBox(100, 150, 200, 400)),
        new Pack(1, 'ICY', [
            '- Less Surface Friction',
            '- Walls More Bouncy',
            '- Lower shot power'
        ], new BoundingBox(400, 150, 200, 400)),
        new Pack(2, 'SUPER SIZE', [
            '- Large holes',
            '- Higher Shot Power',
            '- Walls Less Bouncy',
        ], new BoundingBox(700, 150, 200, 400)),
    ];

    mouseDown(event: MouseEvent, canvas: HTMLCanvasElement) {
        const clicked = this.packs.find(b => b.boundingBox.contains(event, canvas));
        if (clicked) {
            resetGameSettings();
            resetPlayerInfo();
            if (clicked.id === 0) {
                //TODO: Anything?
            }
            else if (clicked.id === 1) {
                gameSettings.shotStrength = 0.1;
                gameSettings.friction = 0.985;
                gameSettings.sandFriction = 0.9;
                gameSettings.wallEnergyLoss = 0.7;
            }
            else if (clicked.id === 2) {
                gameSettings.shotStrength = 0.4;
                gameSettings.holeSizeInc = 10;
                gameSettings.wallEnergyLoss = 0.1;
            }
            closeUI();
            canvas.style.cursor = 'crosshair';
        }
    }

    mouseUp(_: MouseEvent, __: HTMLCanvasElement) {

    }

    mouseMove(event: MouseEvent, canvas: HTMLCanvasElement) {
        const hovering = this.packs.find(b => b.boundingBox.contains(event, canvas));
        if (hovering)
            canvas.style.cursor = 'pointer';
        else
            canvas.style.cursor = 'default';
    }

    render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = '#000d';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.font = '75px "Libre Baskerville"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.fillText('Starting Pack', canvas.width / 2, 100);
        ctx.strokeText('Starting Pack', canvas.width / 2, 100);

        this.packs.forEach(p => {
            ctx.beginPath();
            const bb = p.boundingBox;
            ctx.fillStyle = '#222';
            ctx.roundRect(bb.x, bb.y, bb.width, bb.height, 5);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = '20px "Libre Baskerville"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(p.name, bb.x + (bb.width / 2), bb.y + 20);
            ctx.font = '12px "Libre Baskerville"';
            ctx.textAlign = 'start';
            p.text.forEach((t, i) => {
                ctx.fillText(t, bb.x + 10, bb.y + 60 + (i * 30));
            });
        });
    }


    update(_: number, __: number, ___: number) {

    }
}