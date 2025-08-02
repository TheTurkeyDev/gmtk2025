import type { CourseHole } from '../../types/room';

const course1H3: CourseHole = {
    teeBox: { x: 100, y: 360 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 4 },
            x: 950,
            y: 360,
            size: 10,
            coins: 1
        },
    ],
    walls: [
        { x1: 50, y1: 310, x2: 50, y2: 410 },
        { x1: 50, y1: 310, x2: 500, y2: 200 },
        { x1: 50, y1: 410, x2: 500, y2: 520 },
        { x1: 500, y1: 200, x2: 1000, y2: 310 },
        { x1: 500, y1: 520, x2: 1000, y2: 410 },
        { x1: 1000, y1: 310, x2: 1000, y2: 410 },
        { x1: 500, y1: 275, x2: 500, y2: 368 },
        { x1: 500, y1: 382, x2: 500, y2: 445 },
        { x1: 450, y1: 368, x2: 500, y2: 368 },
        { x1: 450, y1: 382, x2: 500, y2: 382 },
        { x1: 500, y1: 368, x2: 600, y2: 335 },
        { x1: 500, y1: 382, x2: 600, y2: 410 },
    ],
    coins: [
        { type: 1, x: 575, y: 375, size: 10 }
    ],
    sand: [],
    water: [],
    text: [
        {
            text: 'Hole 3: Shoot The Gap?',
            x: 500,
            y: 150,
            size: 18
        }
    ]
};

export default course1H3;