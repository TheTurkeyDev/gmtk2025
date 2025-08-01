import { pointInPolygon } from '../phys/phys-helper';
import type { Position } from './position';

export type SandTrap = {
    points: Position[]
}

function getBounds(points: Position[]) {
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;

    points.forEach(point => {
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
    });

    return { minX, minY, maxX, maxY };
}

export function drawSandTrap(sand: SandTrap, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    sand.points.forEach((p, i) => {
        if (i === 0)
            ctx.moveTo(p.x, p.y);
        else
            ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = '#ba8f11ff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#8f6d07ff';
    ctx.stroke();

    ctx.strokeStyle = '#9c4d1571';
    ctx.lineWidth = 1;
    const bounds = getBounds(sand.points);

    for (let y = bounds.minY; y < bounds.maxY; y += 8) {
        ctx.beginPath();
        let startX = null;
        for (let x = bounds.minX; x <= bounds.maxX; x += 2) {
            if (pointInPolygon(x, y, sand.points)) {
                const waveY = y + Math.sin(x * 0.1) * 2;
                if (startX === null) {
                    ctx.moveTo(x, waveY);
                    startX = x;
                } else {
                    ctx.lineTo(x, waveY);
                }
            } else {
                if (startX !== null) {
                    ctx.stroke();
                    ctx.beginPath();
                    startX = null;
                }
            }
        }
        if (startX !== null)
            ctx.stroke();
    }
}