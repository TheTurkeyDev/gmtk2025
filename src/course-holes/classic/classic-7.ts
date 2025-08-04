import type { CourseHole } from '../../types/room';

const course1H7: CourseHole = {
    teeBox: { x: 540, y: 625 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 8 },
            x: 450,
            y: 175,
            size: 10,
            coins: 2
        },
        {
            nextHole: { courseId: 1, holeNum: 8 },
            x: 630,
            y: 175,
            size: 10,
            coins: 2
        },
    ],
    walls: [
        { x1: 400, y1: 675, x2: 680, y2: 675 },
        { x1: 400, y1: 675, x2: 400, y2: 100 },
        { x1: 680, y1: 675, x2: 680, y2: 100 },
        { x1: 400, y1: 100, x2: 680, y2: 100 },
        { x1: 540, y1: 175, x2: 510, y2: 150 },
        { x1: 540, y1: 175, x2: 570, y2: 150 },
    ],
    coins: [
        { type: 1, x: 620, y: 525, size: 10 },
        { type: 1, x: 460, y: 525, size: 10 },
        { type: 0, x: 540, y: 275, size: 10 },
        { type: 1, x: 540, y: 375, size: 10 },
        { type: 0, x: 540, y: 475, size: 10 },
        { type: 1, x: 540, y: 125, size: 10 },
        { type: 1, x: 540, y: 150, size: 10 },
    ],
    sand: [
        {
            points: [
                { x: 400, y: 500 },
                { x: 530, y: 500 },
                { x: 530, y: 550 },
                { x: 400, y: 550 }
            ]
        },
        {
            points: [
                { x: 550, y: 500 },
                { x: 680, y: 500 },
                { x: 680, y: 550 },
                { x: 550, y: 550 }
            ]
        }
    ],
    water: [
        {
            points: [
                { x: 400, y: 250 },
                { x: 530, y: 250 },
                { x: 530, y: 500 },
                { x: 400, y: 500 }
            ]
        },
        {
            points: [
                { x: 550, y: 250 },
                { x: 680, y: 250 },
                { x: 680, y: 500 },
                { x: 550, y: 500 }
            ]
        }
    ],
    text: [
        {
            text: 'Hole 7: The Bridge',
            x: 200,
            y: 360,
            size: 18
        }
    ]
};

export default course1H7;