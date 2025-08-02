import type { CourseHole } from '../../types/room';

const course1H4: CourseHole = {
    teeBox: { x: 100, y: 600 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 5 },
            x: 950,
            y: 600,
            size: 10,
            coins: 1
        },
    ],
    walls: [
        { x1: 50, y1: 650, x2: 1000, y2: 650 },
        { x1: 50, y1: 100, x2: 50, y2: 650 },
        { x1: 50, y1: 100, x2: 1000, y2: 100 },
        { x1: 1000, y1: 100, x2: 1000, y2: 650 },
    ],
    coins: [
        { type: 1, x: 250, y: 625, size: 10 },
        { type: 0, x: 635, y: 345, size: 10 },
        { type: 0, x: 765, y: 460, size: 10 },
        { type: 0, x: 100, y: 125, size: 10 },
        { type: 0, x: 950, y: 125, size: 10 }
    ],
    sand: [],
    water: [
        {
            points: [
                {x: 200, y: 600},
                {x: 300, y: 400},
                {x: 450, y: 300},
                {x: 500, y: 200},
                {x: 525, y: 210},
                {x: 600, y: 350},
                {x: 650, y: 375},
                {x: 700, y: 375},
                {x: 715, y: 400},
                {x: 750, y: 475},
                {x: 850, y: 550},
                {x: 900, y: 650},
                {x: 850, y: 700},
                {x: 500, y: 675},
                {x: 400, y: 700},
                {x: 300, y: 670},
                {x: 250, y: 600}
            ]
        }
    ],
    text: [
        {
            text: 'Hole 4: Around The Water',
            x: 550,
            y: 550,
            size: 18
        }
    ]
};

export default course1H4;