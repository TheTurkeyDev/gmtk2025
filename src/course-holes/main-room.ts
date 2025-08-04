import type { CourseHole } from '../types/room';

const roomData: CourseHole = {
    teeBox: { x: 500, y: 360 },
    holes: [
        { nextHole: { courseId: 1, holeNum: 1 }, x: 100, y: 360, size: 10, coins: 0 },
        { nextHole: { courseId: 0, holeNum: 1 }, x: 500, y: 300, size: 10, coins: 0 },
    ],
    walls: [
        { x1: 50, y1: 50, x2: 1025, y2: 50 },
        { x1: 50, y1: 50, x2: 50, y2: 675 },
        { x1: 50, y1: 675, x2: 1025, y2: 675 },
        { x1: 1025, y1: 50, x2: 1025, y2: 675 },
    ],
    coins: [],
    sand: [],
    water: [],
    text: [
        {
            text: 'Classic Course',
            x: 125,
            y: 325,
            size: 18
        },
        {
            text: '↓ Click on the ball & drag to aim and shoot!',
            x: 695,
            y: 340,
            size: 18
        },
        {
            text: 'Tutorial',
            x: 500,
            y: 275,
            size: 18
        },
        {
            text: 'Press ESC to open sound settings',
            x: 500,
            y: 525,
            size: 16
        }
    ]
};

export default roomData;