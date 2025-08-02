import type { CourseHole } from '../../types/room';

const course1H171: CourseHole = {
    teeBox: { x: 250, y: 360 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 18 },
            x: 850,
            y: 360,
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
            text: 'Hole 17-1: Choose Your Own Adventure',
            x: 550,
            y: 525,
            size: 18
        }
    ]
};

export default course1H171;