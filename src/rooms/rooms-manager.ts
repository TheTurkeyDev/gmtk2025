import type { Room } from '../types/room';
import room00 from './0-0';
import roomN10 from './-1-0';

export function loadRoomData(x: number, y: number): Room | null {
    if (x === 0 && y === 0)
        return room00;
    if (x === -1 && y === 0)
        return roomN10;
    return null;
}