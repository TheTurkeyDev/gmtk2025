import type { CourseHole } from '../../types/room';

const course1H8: CourseHole = {
    teeBox: { x: 100, y: 360 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 9 },
            x: 900,
            y: 360,
            size: 10,
            coins: 2
        },
    ],
    walls: [
        { x1: 50, y1: 260, x2: 50, y2: 460 },
        { x1: 50, y1: 460, x2: 1000, y2: 460 },
        { x1: 1000, y1: 260, x2: 1000, y2: 460 },
        { x1: 50, y1: 260, x2: 150, y2: 260 },
        { x1: 300, y1: 260, x2: 700, y2: 260 },
        { x1: 850, y1: 260, x2: 1000, y2: 260 },
        { x1: 150, y1: 260, x2: 400, y2: 100 },
        { x1: 400, y1: 100, x2: 600, y2: 100 },
        { x1: 600, y1: 100, x2: 850, y2: 260 },
        { x1: 300, y1: 260, x2: 450, y2: 160 },
        { x1: 450, y1: 160, x2: 550, y2: 160 },
        { x1: 550, y1: 160, x2: 700, y2: 260 },
    ],
    coins: [
        { type: 1, x: 500, y: 130, size: 10 },
        { type: 0, x: 400, y: 150, size: 10 },
        { type: 0, x: 325, y: 200, size: 10 },
        { type: 0, x: 250, y: 250, size: 10 },
        { type: 0, x: 600, y: 150, size: 10 },
        { type: 0, x: 675, y: 200, size: 10 },
        { type: 0, x: 750, y: 250, size: 10 },
    ],
    sand: [],
    water: [],
    text: [
        {
            text: 'Hole 8: Alternate Path',
            x: 500,
            y: 500,
            size: 18
        }
    ]
};

export default course1H8;