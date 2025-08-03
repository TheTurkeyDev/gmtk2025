import type { CourseHole } from '../../types/room';

const course1H2: CourseHole = {
    teeBox: { x: 200, y: 600 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 3 },
            x: 750,
            y: 190,
            size: 10,
            coins: 1
        },
    ],
    walls: [
        { x1: 100, y1: 650, x2: 300, y2: 650 },
        { x1: 100, y1: 650, x2: 100, y2: 100 },
        { x1: 100, y1: 100, x2: 800, y2: 100 },
        { x1: 800, y1: 100, x2: 800, y2: 250 },
        { x1: 800, y1: 250, x2: 600, y2: 250 },
        { x1: 300, y1: 500, x2: 600, y2: 250 },
        { x1: 300, y1: 650, x2: 300, y2: 500 },
        { x1: 300, y1: 450, x2: 300, y2: 250 },
        { x1: 300, y1: 250, x2: 550, y2: 250 },
        { x1: 300, y1: 450, x2: 550, y2: 250 },
        { x1: 150, y1: 200, x2: 250, y2: 150 },
    ],
    coins: [
        { type: 0, x: 175, y: 145, size: 10 },
        { type: 1, x: 423, y: 373, size: 10 }
    ],
    sand: [
        {
            points: [
                { x: 300, y: 500 },
                { x: 300, y: 450 },
                { x: 550, y: 250 },
                { x: 600, y: 250 }
            ]
        }
    ],
    water: [],
    text: [
        {
            text: 'Hole 2: The Angle',
            x: 500,
            y: 500,
            size: 18
        }
    ]
};

export default course1H2;