import type { CourseHole } from '../../types/room';

const getCoinLine1 = () => {
    return Array.from({ length: 15 }, (_, i) => i).map(i => ({ type: i > 12 ? 1 : 0, x: 97, y: 125 + (i * 30), size: 10 }));
};

const getCoinLine2 = () => {
    return Array.from({ length: 15 }, (_, i) => i).map(i => ({ type: i > 12 ? 1 : 0, x: 237, y: 600 - (i * 30), size: 10 }));
};
const course1H16: CourseHole = {
    teeBox: { x: 100, y: 75 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 17 },
            x: 400,
            y: 400,
            size: 10,
            coins: 3
        },
    ],
    walls: [
        { x1: 50, y1: 44, x2: 981, y2: 44 },
        { x1: 981, y1: 44, x2: 981, y2: 675 },
        { x1: 981, y1: 675, x2: 50, y2: 675 },
        { x1: 50, y1: 675, x2: 50, y2: 44 },
        { x1: 132, y1: 100, x2: 882, y2: 100 },
        { x1: 882, y1: 100, x2: 882, y2: 634 },
        { x1: 758, y1: 675, x2: 758, y2: 180 },
        { x1: 655, y1: 112, x2: 655, y2: 613 },
        { x1: 552, y1: 675, x2: 552, y2: 218 }
    ],
    coins: [
        ...getCoinLine1(),
        ...getCoinLine2()
    ],
    sand: [
        {
            points: [
                { x: 85, y: 650 },
                { x: 85, y: 600 },
                { x: 110, y: 600 },
                { x: 110, y: 650 },
            ]
        },
        {
            points: [
                { x: 200, y: 650 },
                { x: 200, y: 625 },
                { x: 250, y: 625 },
                { x: 250, y: 650 },
            ]
        }
    ],
    water: [
        {
            points: [
                { x: 50, y: 675 },
                { x: 50, y: 100 },
                { x: 85, y: 100 },
                { x: 85, y: 650 },
                { x: 250, y: 650 },
                { x: 250, y: 150 },
                { x: 300, y: 150 },
                { x: 300, y: 675 },
            ]
        },
        {
            points: [
                { x: 110, y: 625 },
                { x: 110, y: 100 },
                { x: 225, y: 100 },
                { x: 225, y: 625 },
            ]
        }
    ],
    text: [
        {
            text: 'Hole 16: The Risky Path',
            x: 550,
            y: 700,
            size: 18
        }
    ]
};

export default course1H16;