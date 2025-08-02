import type { CourseHole } from '../../types/room';

const course1H6: CourseHole = {
    teeBox: { x: 100, y: 650 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 7 },
            x: 900,
            y: 125,
            size: 10,
            coins: 1
        },
    ],
    walls: [
        { x1: 50, y1: 635, x2: 100, y2: 700 },
        { x1: 50, y1: 635, x2: 400, y2: 200 },
        { x1: 100, y1: 700, x2: 700, y2: 500 },
        { x1: 400, y1: 200, x2: 900, y2: 50 },
        { x1: 700, y1: 500, x2: 975, y2: 125 },
        { x1: 900, y1: 50, x2: 975, y2: 125 },
        { x1: 845, y1: 300, x2: 750, y2: 200 },
        { x1: 750, y1: 200, x2: 700, y2: 190 },
    ],
    coins: [
        { type: 1, x: 850, y: 225, size: 10 },
        { type: 0, x: 550, y: 180, size: 10 },
        { type: 1, x: 400, y: 250, size: 10 },
        { type: 0, x: 400, y: 550, size: 10 },
    ],
    sand: [
        {
            points: [
                { x: 125, y: 550 },
                { x: 150, y: 625 },
                { x: 200, y: 625 },
                { x: 225, y: 600 },
                { x: 225, y: 420 },
            ]
        },
        {
            points: [
                { x: 325, y: 625 },
                { x: 325, y: 450 },
                { x: 350, y: 400 },
                { x: 360, y: 350 },
                { x: 400, y: 375 },
                { x: 550, y: 550 },
            ]
        }
    ],
    water: [
        {
            points: [
                { x: 450, y: 190 },
                { x: 425, y: 225 },
                { x: 425, y: 325 },
                { x: 600, y: 500 },
                { x: 700, y: 425 },
                { x: 725, y: 250 },
            ]
        }
    ],
    text: [
        {
            text: 'Hole 6: Zig Zag',
            x: 550,
            y: 625,
            size: 18
        }
    ]
};

export default course1H6;