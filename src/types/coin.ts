import { drawStar } from '../grahpics/draw-helper';

export type Coin = {
    type: number,
    x: number,
    y: number,
    size: number
}

export function drawCoin(coin: Coin, ctx: CanvasRenderingContext2D) {
    switch (coin.type) {
        case 0:
            drawSilverCoin(ctx, coin.x, coin.y, coin.size);
            return;
        case 1:
            drawGoldCoin(ctx, coin.x, coin.y, coin.size);
            return;
        case 2:
            drawGlowCoin(ctx, coin.x, coin.y, coin.size);
            return;
        case 3:
            drawGemCoin(ctx, coin.x, coin.y, coin.size);
            return;
    }
}

export function drawGoldCoin(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.beginPath();
    ctx.ellipse(x, y + 13, size / 1.1, 3, 0, 0, 2 * Math.PI);
    ctx.fillStyle = '#22222288';
    ctx.fill();

    // Outer ring
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner circle
    ctx.beginPath();
    ctx.arc(x, y, size * 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFA500';
    ctx.fill();

    // Center dollar sign
    ctx.fillStyle = '#090909ff';
    ctx.font = `${size * 0.8}px "Libre Baskerville"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', x, y + 1);
}

// Silver Coin with Star
export function drawSilverCoin(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.beginPath();
    ctx.ellipse(x, y + 13, size / 1.1, 3, 0, 0, 2 * Math.PI);
    ctx.fillStyle = '#22222288';
    ctx.fill();


    // Main body
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = '#C0C0C0';
    ctx.fill();
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner ring
    ctx.beginPath();
    ctx.arc(x, y, size * 0.8, 0, 2 * Math.PI);
    ctx.strokeStyle = '#696969';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Star shape
    drawStar(ctx, x, y, 5, size * 0.4, size * 0.2);
    ctx.fillStyle = '#2F4F4F';
    ctx.fill();
}

// Glowing Power Coin
export function drawGlowCoin(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.beginPath();
    ctx.ellipse(x, y + 13, size / 1.1, 3, 0, 0, 2 * Math.PI);
    ctx.fillStyle = '#22222288';
    ctx.fill();


    // Glow effect
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 1.5);
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
    gradient.addColorStop(0.7, 'rgba(0, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size * 1.5, 0, 2 * Math.PI);
    ctx.fill();

    // Main coin
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = '#00CED1';
    ctx.fill();
    ctx.strokeStyle = '#008B8B';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Energy core
    ctx.beginPath();
    ctx.arc(x, y, size * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#E0FFFF';
    ctx.fill();

    // Lightning bolt
    ctx.beginPath();
    ctx.moveTo(x - size * 0.2, y - size * 0.3);
    ctx.lineTo(x + size * 0.1, y - size * 0.1);
    ctx.lineTo(x - size * 0.1, y);
    ctx.lineTo(x + size * 0.2, y + size * 0.3);
    ctx.lineTo(x - size * 0.1, y + size * 0.1);
    ctx.lineTo(x + size * 0.1, y);
    ctx.closePath();
    ctx.fillStyle = '#000000ff';
    ctx.fill();
}

export function drawGemCoin(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.beginPath();
    ctx.ellipse(x, y + 13, size / 1.1, 3, 0, 0, 2 * Math.PI);
    ctx.fillStyle = '#22222288';
    ctx.fill();

    // Base coin
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = '#4B0082';
    ctx.fill();
    ctx.strokeStyle = '#8A2BE2';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Gem facets
    const gemRadius = size * 0.6;
    const sides = 6;
    ctx.beginPath();

    for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        const gemX = x + Math.cos(angle) * gemRadius;
        const gemY = y + Math.sin(angle) * gemRadius;
        if (i === 0) ctx.moveTo(gemX, gemY);
        else ctx.lineTo(gemX, gemY);
    }
    ctx.closePath();
    ctx.fillStyle = '#9370DB';
    ctx.fill();
    ctx.strokeStyle = '#DDA0DD';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Inner gem highlight
    ctx.beginPath();

    for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        const gemX = x + Math.cos(angle) * gemRadius * 0.5;
        const gemY = y + Math.sin(angle) * gemRadius * 0.5;
        if (i === 0) ctx.moveTo(gemX, gemY);
        else ctx.lineTo(gemX, gemY);
    }
    ctx.closePath();
    ctx.fillStyle = '#E6E6FA';
    ctx.fill();
}

// Animated spinning coin
const spinAngle = 0;
export function drawSpinningCoin(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(Math.cos(spinAngle), 1);

    const showFront = Math.cos(spinAngle) > 0;

    if (showFront) {
        // Front side - gold coin design
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
        ctx.strokeStyle = '#B8860B';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, size * 0.7, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFA500';
        ctx.fill();

        ctx.fillStyle = '#8B7355';
        ctx.font = `${size * 0.8}px "Libre Baskerville"`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, 0);
    } else {
        // Back side - silver coin design
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, 2 * Math.PI);
        ctx.fillStyle = '#C0C0C0';
        ctx.fill();
        ctx.strokeStyle = '#808080';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, size * 0.8, 0, 2 * Math.PI);
        ctx.strokeStyle = '#696969';
        ctx.lineWidth = 1;
        ctx.stroke();

        drawStar(ctx, 0, 0, 5, size * 0.4, size * 0.2);
        ctx.fillStyle = '#2F4F4F';
        ctx.fill();
    }

    ctx.restore();
}