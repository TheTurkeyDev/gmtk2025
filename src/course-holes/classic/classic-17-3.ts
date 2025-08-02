import type { CourseHole } from '../../types/room';

const course1H173: CourseHole = {
    teeBox: { x: 250, y: 360 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 171 },
            x: 800,
            y: 260,
            size: 10,
            coins: 3
        },
        {
            nextHole: { courseId: 1, holeNum: 172 },
            x: 850,
            y: 360,
            size: 10,
            coins: 3
        },
        {
            nextHole: { courseId: 1, holeNum: 174 },
            x: 800,
            y: 460,
            size: 10,
            coins: 3
        },
    ],
    walls: [
        { x1: 200, y1: 200, x2: 900, y2: 200 },
        { x1: 900, y1: 200, x2: 900, y2: 500 },
        { x1: 900, y1: 500, x2: 200, y2: 500 },
        { x1: 200, y1: 500, x2: 200, y2: 200 },
    ],
    coins: [],
    sand: [],
    water: [],
    text: [
        {
            text: 'Hole 17-3: Choose Your Own Adventure',
            x: 550,
            y: 525,
            size: 18
        }
    ]
};

export default course1H173;