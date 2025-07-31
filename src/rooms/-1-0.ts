import type { Room } from '../types/room';

const roomData: Room = {
    holes: [
        { id: 'right', x: 950, y: 350, size: 10 },
    ],
    walls: [
        { x1: 50, y1: 50, x2: 1000, y2: 50 },
        { x1: 50, y1: 50, x2: 50, y2: 650 },
        { x1: 50, y1: 650, x2: 1000, y2: 650 },
        { x1: 1000, y1: 50, x2: 1000, y2: 650 },
    ],
    coins: [
        { type: 0, x: 400, y: 350, size: 10 },
    ]
};

export default roomData;