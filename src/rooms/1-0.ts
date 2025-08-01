import type { Room } from '../types/room';

const roomData: Room = {
    holes: [
        { dir: 'left', x: 100, y: 350, size: 10 },
    ],
    walls: [
        { x1: 50, y1: 50, x2: 1025, y2: 50 },
        { x1: 50, y1: 50, x2: 50, y2: 675 },
        { x1: 50, y1: 675, x2: 1025, y2: 675 },
        { x1: 1025, y1: 50, x2: 1025, y2: 675 },
    ],
    coins: [
    ],
    sand: [
    ],
    water: [
    ]
};

export default roomData;