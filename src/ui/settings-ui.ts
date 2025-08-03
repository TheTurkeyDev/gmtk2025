import { masterVolume, musicVolume, setMasterVolume, setMusicVolume, setSFXVolume, sfxVolume } from '../audio/sounds';
import { openUI } from '../main';
import { Button } from './components/button';
import { Slider } from './components/slider';
import { MainUI } from './main-ui';
import type { UI } from './ui-type';

export class SettingsUI implements UI {
    buttons: Button[] = [
        new Button(440, 600, 200, 50, '#33f', 'BACK', '#fff', 20, () => openUI(new MainUI()))
    ];

    sliders: Slider[] = [
        new Slider(275, 150, 500, 80, 'Master Volume', {
            value: masterVolume * 100,
            min: 0,
            max: 100,
            fillColor: '#33f',
            onChange: v => setMasterVolume(v / 100)
        }),
        new Slider(275, 200, 500, 80, 'SFX Volume', {
            value: sfxVolume * 100,
            min: 0,
            max: 100,
            fillColor: '#33f',
            onChange: v => setSFXVolume(v / 100)
        }),
        new Slider(275, 250, 500, 80, 'Music Volume', {
            value: musicVolume * 100,
            min: 0,
            max: 100,
            fillColor: '#33f',
            onChange: v => setMusicVolume(v / 100)
        })
    ];

    mouseDown(event: MouseEvent, canvas: HTMLCanvasElement) {
        const clicked = this.buttons.find(b => b.contains(event, canvas));
        if (clicked)
            clicked.onClick();

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.sliders.find(s => s.handlePointerDown(x, y));
    }

    mouseUp(_: MouseEvent, __: HTMLCanvasElement) {
        this.sliders.forEach(s => s.handlePointerUp());
    }

    mouseMove(event: MouseEvent, canvas: HTMLCanvasElement) {
        const hovering = this.buttons.find(b => b.contains(event, canvas));
        if (hovering)
            canvas.style.cursor = 'pointer';
        else
            canvas.style.cursor = 'default';

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.sliders.find(s => s.handlePointerMove(x, y));
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
        this.sliders.forEach(s => s.render(ctx));
    }


    update(delta: number, __: number, ___: number) {
        this.sliders.forEach(s => s.update(delta));
    }
}