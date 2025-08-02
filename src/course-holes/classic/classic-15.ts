import type { CourseHole } from '../../types/room';

const course1H15: CourseHole = {
    teeBox: { x: 125, y: 550 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 16 },
            x: 175,
            y: 610,
            size: 10,
            coins: 3
        },
    ],
    walls: [
        { x1: 75, y1: 650, x2: 75, y2: 75 },
        { x1: 75, y1: 75, x2: 950, y2: 75 },
        { x1: 950, y1: 75, x2: 950, y2: 650 },
        { x1: 950, y1: 650, x2: 75, y2: 650 },
        { x1: 75, y1: 650, x2: 450, y2: 350 },
        { x1: 200, y1: 450, x2: 200, y2: 150 },
        { x1: 200, y1: 150, x2: 850, y2: 150 },
        { x1: 850, y1: 150, x2: 850, y2: 575 },
        { x1: 850, y1: 575, x2: 300, y2: 575 }
    ],
    coins: [
        { type: 1, x: 125, y: 125, size: 10 },
        { type: 1, x: 900, y: 125, size: 10 },
        { type: 1, x: 900, y: 600, size: 10 },
    ],
    sand: [
        {
            points: [
                { x: 200, y: 575 },
                { x: 200, y: 150 },
                { x: 850, y: 150 },
                { x: 850, y: 575 },
            ]
        }
    ],
    water: [],
    text: [
        {
            text: 'Hole 15: Around The Block',
            x: 550,
            y: 675,
            size: 18
        }
    ]
};

export default course1H15;