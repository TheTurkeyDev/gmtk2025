import type { CourseHole } from '../../types/room';

const tutorialH1: CourseHole = {
    teeBox: { x: 200, y: 360 },
    holes: [
        { nextHole: { courseId: 0, holeNum: 2 }, x: 800, y: 360, size: 10, coins: 0 },
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
            text: 'This is your golf ball',
            x: 290,
            y: 220,
            size: 16
        },
        {
            text: 'Click on the ball & drag to aim and shoot!',
            x: 377,
            y: 250,
            size: 16
        },
        {
            text: 'The line will show your aim direction and power amount',
            x: 443,
            y: 280,
            size: 16
        },
        {
            text: 'The ring is the max shot power',
            x: 337,
            y: 310,
            size: 16
        },
        {
            text: '↓ Click on the ball & drag to aim and shoot!',
            x: 373,
            y: 340,
            size: 16
        },
        {
            text: 'This is the golf hole ↑',
            x: 718,
            y: 390,
            size: 16
        },
        {
            text: 'Get the ball into the hole to gain coins & move on to the next hole!',
            x: 532,
            y: 420,
            size: 16
        }
    ]
};

export default tutorialH1;