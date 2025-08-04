import type { CourseHole } from '../../types/room';

const tutorialH2: CourseHole = {
    teeBox: { x: 200, y: 360 },
    holes: [
        { nextHole: { courseId: 0, holeNum: 3 }, x: 800, y: 360, size: 10, coins: 0 },
    ],
    walls: [
        { x1: 50, y1: 50, x2: 1025, y2: 50 },
        { x1: 50, y1: 50, x2: 50, y2: 675 },
        { x1: 50, y1: 675, x2: 1025, y2: 675 },
        { x1: 1025, y1: 50, x2: 1025, y2: 675 },
        { x1: 50, y1: 300, x2: 1025, y2: 300 },
        { x1: 50, y1: 400, x2: 1025, y2: 400 },
    ],
    coins: [
        { type: 0, x: 300, y: 250, size: 10 },
        { type: 1, x: 800, y: 250, size: 10 },
    ],
    sand: [],
    water: [],
    text: [
        {
            text: 'These are coins!',
            x: 550,
            y: 75,
            size: 20
        },
        {
            text: 'Hit your ball over them to collect!',
            x: 550,
            y: 100,
            size: 18
        },
        {
            text: '↓ Silver is worth 1 coin',
            x: 387,
            y: 225,
            size: 16
        },
        {
            text: '↓ Gold is worth 5 coins',
            x: 887,
            y: 225,
            size: 16
        },
        {
            text: 'Next Tutorial Level',
            x: 800,
            y: 330,
            size: 18
        },
    ]
};

export default tutorialH2;