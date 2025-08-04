import type { CourseHole } from '../../types/room';

const tutorialH3: CourseHole = {
    teeBox: { x: 200, y: 360 },
    holes: [
        { nextHole: { courseId: 0, holeNum: 4 }, x: 800, y: 360, size: 10, coins: 0 },
    ],
    walls: [
        { x1: 50, y1: 50, x2: 1025, y2: 50 },
        { x1: 50, y1: 50, x2: 50, y2: 675 },
        { x1: 50, y1: 675, x2: 1025, y2: 675 },
        { x1: 1025, y1: 50, x2: 1025, y2: 675 },
        { x1: 50, y1: 300, x2: 1025, y2: 300 },
        { x1: 50, y1: 400, x2: 1025, y2: 400 },
    ],
    coins: [],
    sand: [
        {
            points: [
                { x: 300, y: 310 },
                { x: 650, y: 310 },
                { x: 650, y: 375 },
                { x: 300, y: 375 },
            ]
        }
    ],
    water: [
        {
            points: [
                { x: 200, y: 200 },
                { x: 900, y: 200 },
                { x: 900, y: 290 },
                { x: 200, y: 290 },
            ]
        }
    ],
    text: [
        {
            text: 'These are Hazards',
            x: 550,
            y: 75,
            size: 20
        },
        {
            text: 'Water will cause you to take an additional penalty stroke',
            x: 550,
            y: 150,
            size: 16
        },
        {
            text: 'Your ball will also be reset to its previous spot',
            x: 550,
            y: 180,
            size: 16
        },
        {
            text: 'Sand slows your ball',
            x: 475,
            y: 390,
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

export default tutorialH3;