import { playerInfo } from '../game/game-info';
import { fullReset, openUI } from '../main';
import { Button } from './components/button';
import { MainUI } from './main-ui';
import type { UI } from './ui-type';

export class GameOverUI implements UI {

    buttons: Button[] = [
        new Button(440, 300, 200, 50, '#33f', 'PLAY AGAIN', '#fff', 20, () => {
            fullReset();
            openUI(new MainUI());
        }),
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
        ctx.fillText('GAME OVER!', canvas.width / 2, 100);
        ctx.strokeText('GAME OVER!', canvas.width / 2, 100);

        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.font = '18px "Libre Baskerville"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.fillText(`It took you ${playerInfo.strokesTaken} strokes to complete the course!`, canvas.width / 2, 200);
        ctx.fillText(`You had ${playerInfo.penaltyStrokes} penalty strokes...`, canvas.width / 2, 225);
        ctx.fillText('Think you can beat that?', canvas.width / 2, 275);

        this.buttons.forEach(b => b.render(ctx));
    }


    update(_: number, __: number, ___: number) {

    }
}