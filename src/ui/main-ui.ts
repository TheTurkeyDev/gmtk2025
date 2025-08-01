import { openUI } from '../main';
import { Button } from './components/button';
import { StartPackUI } from './start-pack-ui';
import type { UI } from './ui-type';

export class MainUI implements UI {
    buttons: Button[] = [
        new Button(200, 300, 200, 50, '#33f', 'START', '#fff', 20, () => openUI(new StartPackUI()))
    ];

    mouseDown(event: MouseEvent, canvas: HTMLCanvasElement) {
        const clicked = this.buttons.find(b => b.contains(event, canvas));
        if (clicked)
            clicked.onClick();
    }

    mouseUp(_: MouseEvent, __: HTMLCanvasElement) {

    }

    mouseMove(event: MouseEvent, canvas: HTMLCanvasElement) {
        const hovering = this.buttons.find(b => b.contains(event, canvas));
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
        ctx.fillText('PUTT-LIKE', canvas.width / 2, 100);
        ctx.strokeText('PUTT-LIKE', canvas.width / 2, 100);

        this.buttons.forEach(b => b.render(ctx));
    }


    update(_: number, __: number, ___: number) {

    }
}