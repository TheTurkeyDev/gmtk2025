import { initSounds } from './audio/sounds';
import { Game } from './game/game';
import { MainUI } from './ui/main-ui';
import type { UI } from './ui/ui-type';

const canvas = document.getElementById('game') as HTMLCanvasElement | undefined;
const ctx = canvas?.getContext('2d');

const game = new Game();
game.initGame();

let ui: UI | null = new MainUI();
// ui = null;
// ui = new ShopUI();

let lastRender = 0;

/** === Events === */
canvas?.addEventListener('mousedown', event => {
    if (ui)
        ui.mouseDown(event, canvas);
    else
        game.mouseDown(event, canvas);
});

canvas?.addEventListener('mouseup', event => {
    if (ui)
        ui.mouseUp(event, canvas);
    else
        game.mouseUp(event, canvas);
});


canvas?.addEventListener('mouseleave', event => {
    if (ui)
        ui.mouseUp(event, canvas);
    else
        game.mouseUp(event, canvas);
});

canvas?.addEventListener('mousemove', event => {
    if (ui)
        ui.mouseMove(event, canvas);
    else
        game.mouseMove(event, canvas);
});

// Prevent context menu on right click
canvas?.addEventListener('contextmenu', event => event.preventDefault());

function loop(timestamp: number) {
    render(timestamp);
    update((timestamp - lastRender) / 1000);
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

function render(timestamp: number) {
    if (!canvas || !ctx)
        return;

    game.render(canvas, ctx, timestamp);
    ui?.render(canvas, ctx);
}

function update(delta: number) {
    if (ui)
        ui.update(delta, canvas?.width ?? 1, canvas?.height ?? 1);
    else
        game.update(delta, canvas?.width ?? 1, canvas?.height ?? 1);

}

export function closeUI() {
    ui = null;
}

export function openUI(newUI: UI) {
    ui = newUI;
}


initSounds();
window.requestAnimationFrame(loop);