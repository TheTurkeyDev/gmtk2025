import type { CourseHole } from '../../types/room';

const course1H2: CourseHole = {
    teeBox: { x: 200, y: 650 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 3 },
            x: 750,
            y: 240,
            size: 10,
            coins: 1
        },
    ],
    walls: [
        { x1: 100, y1: 700, x2: 300, y2: 700 },
        { x1: 100, y1: 700, x2: 100, y2: 150 },
        { x1: 100, y1: 150, x2: 800, y2: 150 },
        { x1: 800, y1: 150, x2: 800, y2: 300 },
        { x1: 800, y1: 300, x2: 600, y2: 300 },
        { x1: 300, y1: 550, x2: 600, y2: 300 },
        { x1: 300, y1: 700, x2: 300, y2: 550 },
        { x1: 300, y1: 500, x2: 300, y2: 300 },
        { x1: 300, y1: 300, x2: 550, y2: 300 },
        { x1: 300, y1: 500, x2: 550, y2: 300 },
        { x1: 150, y1: 250, x2: 250, y2: 200 },
    ],
    coins: [
        { type: 0, x: 175, y: 195, size: 10 },
        { type: 1, x: 423, y: 423, size: 10 }
    ],
    sand: [
        {
            points: [
                { x: 300, y: 550 },
                { x: 300, y: 500 },
                { x: 550, y: 300 },
                { x: 600, y: 300 }
            ]
        }
    ],
    water: []
};

export default course1H2;