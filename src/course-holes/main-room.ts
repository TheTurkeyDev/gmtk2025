import type { CourseHole } from '../types/room';

const roomData: CourseHole = {
    teeBox: { x: 500, y: 360 },
    holes: [
        { nextHole: {courseId: 1, holeNum: 1}, x: 100, y: 350, size: 10, coins: 0 },
    ],
    walls: [
        { x1: 50, y1: 50, x2: 1025, y2: 50 },
        { x1: 50, y1: 50, x2: 50, y2: 675 },
        { x1: 50, y1: 675, x2: 1025, y2: 675 },
        { x1: 1025, y1: 50, x2: 1025, y2: 675 },
    ],
    coins: [
        { type: 0, x: 400, y: 350, size: 10 },
        { type: 1, x: 500, y: 350, size: 10 },
        { type: 2, x: 600, y: 350, size: 10 },
        { type: 3, x: 700, y: 350, size: 10 },
    ],
    sand: [
        {
            points: [
                { x: 200, y: 200 },
                { x: 300, y: 250 },
                { x: 250, y: 300 },
                { x: 200, y: 300 },
                { x: 150, y: 200 },
            ]
        }
    ],
    water: [
        {
            points: [
                { x: 500, y: 200 },
                { x: 600, y: 250 },
                { x: 550, y: 300 },
                { x: 500, y: 300 },
                { x: 450, y: 200 },
            ]
        }
    ]
};

export default roomData;