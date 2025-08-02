import type { CourseHole } from '../../types/room';

const course1H9: CourseHole = {
    teeBox: { x: 100, y: 360 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 10 },
            x: 800,
            y: 360,
            size: 10,
            coins: 2
        },
    ],
    walls: [
        { x1: 50, y1: 160, x2: 50, y2: 560 },
        { x1: 50, y1: 560, x2: 1000, y2: 560 },
        { x1: 1000, y1: 160, x2: 1000, y2: 560 },
        { x1: 50, y1: 160, x2: 1000, y2: 160 },
    ],
    coins: [
        { type: 1, x: 450, y: 250, size: 10 },
        { type: 1, x: 550, y: 375, size: 10 },
        { type: 1, x: 450, y: 500, size: 10 },
    ],
    sand: [
        {
            points: [
                { x: 500, y: 560 },
                { x: 600, y: 560 },
                { x: 600, y: 200 },
                { x: 500, y: 200 },
            ]
        }
    ],
    water: [
        {
            points: [
                { x: 775, y: 200 },
                { x: 775, y: 300 },
                { x: 740, y: 340 },
                { x: 735, y: 350 },
                { x: 735, y: 370 },
                { x: 740, y: 380 },
                { x: 775, y: 420 },
                { x: 790, y: 425 },
                { x: 810, y: 425 },
                { x: 825, y: 420 },
                { x: 860, y: 380 },
                { x: 865, y: 370 },
                { x: 865, y: 350 },
                { x: 860, y: 340 },
                { x: 825, y: 300 },
                { x: 825, y: 160 },
                { x: 1000, y: 160 },
                { x: 1000, y: 560 },
                { x: 600, y: 560 },
                { x: 600, y: 200 },
            ]
        }
    ],
    text: [
        {
            text: 'Hole 9: Island Green',
            x: 500,
            y: 600,
            size: 18
        }
    ]
};

export default course1H9;