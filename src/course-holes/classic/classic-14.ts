import type { CourseHole } from '../../types/room';

const getCoins = () => {
    return Array.from({ length: 20 * 10 }, (_, i) => i).map(i => {
        const x = i  % 20;
        const y = Math.floor(i / 20);
        return { type: x > 7 && x < 13 && y > 3 && y < 7 ? 1 : 0, x: (x * 40) + 160, y: (y * 40) + 210, size: 10 };
    }  );
};
const course1H14: CourseHole = {
    teeBox: { x: 350, y: 100 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 15 },
            x: 550,
            y: 100,
            size: 10,
            coins: 3
        },
    ],
    walls: [
        { x1: 300, y1: 75, x2: 600, y2: 75 },
        { x1: 600, y1: 75, x2: 600, y2: 125 },
        { x1: 600, y1: 125, x2: 500, y2: 125 },
        { x1: 500, y1: 125, x2: 500, y2: 175 },
        { x1: 500, y1: 175, x2: 950, y2: 175 },
        { x1: 950, y1: 175, x2: 950, y2: 600 },
        { x1: 950, y1: 600, x2: 125, y2: 600 },
        { x1: 125, y1: 600, x2: 125, y2: 175 },
        { x1: 125, y1: 175, x2: 400, y2: 175 },
        { x1: 400, y1: 175, x2: 400, y2: 125 },
        { x1: 300, y1: 125, x2: 400, y2: 125 },
        { x1: 300, y1: 125, x2: 300, y2: 75 }
    ],
    coins: getCoins(),
    sand: [],
    water: [],
    text: [
        {
            text: 'Hole 14: MoneyBag',
            x: 550,
            y: 700,
            size: 18
        }
    ]
};

export default course1H14;