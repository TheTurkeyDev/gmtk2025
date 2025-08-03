import { gameSettings, gameSettingsDef, playerInfo, playerInfoDef } from '../game/game-info';
import { closeUI } from '../main';
import { Button } from './components/button';
import type { UI } from './ui-type';

class ShopUpgrade {
    id: number;
    name: string;
    x: number;
    y: number;
    width: number = 100;
    height: number = 100;
    initialValue: number;
    step: number;
    max: number;
    startCost: number;
    maxCost: number;
    private update: () => number;
    private customDisplayValue?: (value: number) => string;
    value: number = 0;
    disabled: boolean = false;

    constructor(id: number, name: string, x: number, y: number, initialValue: number, step: number, max: number, startCost: number, maxCost: number, update: () => number, customDisplayValue?: (value: number) => string) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.initialValue = initialValue;
        this.step = step;
        this.max = max;
        this.startCost = startCost;
        this.maxCost = maxCost;
        this.update = update;
        this.customDisplayValue = customDisplayValue;
        this.updateValue();
    }

    getDisplayValue() {
        return this.customDisplayValue ? this.customDisplayValue(this.value) : this.value.toFixed(this.step < 1 ? 2 : 0);
    }


    updateValue() {
        this.value = this.update();
        this.disabled = this.value >= this.max || this.getCost() > playerInfo.coins;
    }

    getNumSteps() {
        return Math.floor((this.max - this.initialValue) / this.step);
    }

    getCompletionAmount() {
        return Math.ceil((this.value - this.initialValue) / this.step) / this.getNumSteps();
    }

    getCost() {
        return Math.round(this.startCost + ((this.maxCost - this.startCost) * this.getCompletionAmount()));
    }

    public contains(event: MouseEvent, canvas: HTMLCanvasElement) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const btnY = this.y + 70;
        return this.x <= x && this.x + this.width >= x && btnY <= y && btnY + 30 >= y;
    }
}

export class ShopUI implements UI {

    upgrades: ShopUpgrade[] = [
        new ShopUpgrade(0, 'Hole Size', 200, 200, gameSettingsDef.holeSizeInc.initial, 1, gameSettingsDef.holeSizeInc.max, 5, 100, () => gameSettings.holeSizeInc),
        new ShopUpgrade(1, 'Shot Power', 400, 200, gameSettingsDef.shotStrength.initial, 1, gameSettingsDef.shotStrength.max, 1, 50, () => gameSettings.shotStrength),
        new ShopUpgrade(2, 'Friction %', 600, 200, gameSettingsDef.friction.initial, 0.003, gameSettingsDef.friction.max, 2, 50, () => gameSettings.friction, (value) => `${((1 - value) * 100).toFixed(1)}%`),
        new ShopUpgrade(3, 'Bunker Friction %', 800, 200, gameSettingsDef.sandFriction.initial, 0.005, gameSettingsDef.sandFriction.max, 5, 50, () => gameSettings.sandFriction, (value) => `${((1 - value) * 100).toFixed(1)}%`),
        new ShopUpgrade(4, 'Wall Bounce Loss %', 200, 400, gameSettingsDef.wallEnergyLoss.initial, 0.01, gameSettingsDef.wallEnergyLoss.max, 1, 75, () => gameSettings.wallEnergyLoss, (value) => `${((1 - value) * 100).toFixed(1)}%`),
        new ShopUpgrade(5, 'Strokes', 400, 400, playerInfoDef.totalStrokes, 1, 999, 1, 1000, () => playerInfo.totalStrokes)
    ];

    buttons: Button[] = [
        new Button(400, 600, 200, 50, '#145890ff', 'CONTINUE', '#ffffff', 20, () => {
            playerInfo.strokesLeft = playerInfo.totalStrokes;
            closeUI();
        })
    ];

    mouseDown(event: MouseEvent, canvas: HTMLCanvasElement) {
        const clicked = this.upgrades.find(u => !u.disabled && u.contains(event, canvas));
        if (clicked) {
            if (clicked.id === 0)
                gameSettings.holeSizeInc = Math.min(gameSettings.holeSizeInc + clicked.step, clicked.max);
            else if (clicked.id === 1)
                gameSettings.shotStrength = Math.min(gameSettings.shotStrength + clicked.step, clicked.max);
            else if (clicked.id === 2)
                gameSettings.friction = Math.min(gameSettings.friction + clicked.step, clicked.max);
            else if (clicked.id === 3)
                gameSettings.sandFriction = Math.min(gameSettings.sandFriction + clicked.step, clicked.max);
            else if (clicked.id === 4)
                gameSettings.wallEnergyLoss = Math.min(gameSettings.wallEnergyLoss + clicked.step, clicked.max);
            else if (clicked.id === 5)
                playerInfo.totalStrokes = Math.min(playerInfo.totalStrokes + clicked.step, clicked.max);
            playerInfo.coins -= clicked.getCost();
            this.upgrades.forEach(u => u.updateValue());
            return;
        }

        const button = this.buttons.find(b => b.contains(event, canvas));
        if (button)
            button.onClick();
    }

    mouseUp(_: MouseEvent, __: HTMLCanvasElement) {

    }

    mouseMove(event: MouseEvent, canvas: HTMLCanvasElement) {
        const hovering = this.upgrades.find(u => u.contains(event, canvas));
        if (hovering) {
            canvas.style.cursor = hovering.disabled ? 'not-allowed' : 'pointer';
            return;
        }

        const button = this.buttons.find(u => u.contains(event, canvas));
        if (button)
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
        ctx.fillText('SHOP', canvas.width / 2, 50);
        ctx.strokeText('SHOP', canvas.width / 2, 50);
        ctx.font = '50px "Libre Baskerville"';
        ctx.fillText(`COINS: ${playerInfo.coins}`, canvas.width / 2, 150);

        this.buttons.forEach(b => b.render(ctx));

        this.upgrades.forEach(u => {
            const hw = u.width / 2;

            ctx.beginPath();
            ctx.fillStyle = '#ffffff';
            ctx.font = '18px "Libre Baskerville"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(u.name, u.x + hw, u.y + 60);
            ctx.font = '15px "Libre Baskerville"';
            ctx.fillText(u.getDisplayValue(), u.x + hw, u.y + 35);
            ctx.strokeStyle = '#a5a5a5ff';
            ctx.lineWidth = 12;
            ctx.arc(u.x + hw, u.y + 45, 35, Math.PI, 2 * Math.PI);
            ctx.stroke();

            const completion = u.getCompletionAmount();

            ctx.beginPath();
            ctx.strokeStyle = '#2d2';
            ctx.lineWidth = 12;
            ctx.arc(u.x + hw, u.y + 45, 35, Math.PI, Math.PI + (Math.PI * completion));
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = u.disabled ? '#9d9db8' : '#2222ff';
            ctx.roundRect(u.x, u.y + 70, 100, 30, 10);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = '18px "Libre Baskerville"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`$${u.getCost()}`, u.x + hw, u.y + 85);
        });
    }


    update(_: number, __: number, ___: number) {

    }
}