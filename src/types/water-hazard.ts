import { pointInPolygon } from '../phys/phys-helper';
import type { Position } from './position';

export type WaterHazard = {
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

export function drawWaterHazard(water: WaterHazard, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    water.points.forEach((p, i) => {
        if (i === 0)
            ctx.moveTo(p.x, p.y);
        else
            ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = '#1686dcff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0d51b0ff';
    ctx.stroke();

    ctx.strokeStyle = '#71b1f17c';
    ctx.lineWidth = 1;
    const bounds = getBounds(water.points);

    for (let y = bounds.minY; y < bounds.maxY; y += 8) {
        ctx.beginPath();
        let startX = null;
        for (let x = bounds.minX; x <= bounds.maxX; x += 2) {
            if (pointInPolygon(x, y, water.points)) {
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