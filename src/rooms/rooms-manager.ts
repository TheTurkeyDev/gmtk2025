import type { Room } from '../types/room';
import room00 from './0-0';
import roomN10 from './-1-0';
import room10 from './1-0';
import room01 from './0-1';
import room0N1 from './0--1';

export function loadRoomData(x: number, y: number): Room | null {
    if (x === 0 && y === 0)
        return room00;
    if (x === -1 && y === 0)
        return roomN10;
    if (x === 1 && y === 0)
        return room10;
    if (x === 0 && y === 1)
        return room01;
    if (x === 0 && y === -1)
        return room0N1;
    return null;
}