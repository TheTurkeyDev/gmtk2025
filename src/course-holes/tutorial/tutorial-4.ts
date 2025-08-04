import type { CourseHole } from '../../types/room';

const tutorialH4: CourseHole = {
    teeBox: { x: 200, y: 360 },
    holes: [
        { nextHole: { courseId: 0, holeNum: 5 }, x: 800, y: 360, size: 10, coins: 0 },
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
    sand: [],
    water: [],
    text: [
        {
            text: '↑ This is how many strokes you have left',
            x: 250,
            y: 65,
            size: 16
        },
        {
            text: 'This is your current coin balance ↑',
            x: 850,
            y: 65,
            size: 16
        },
        {
            text: 'Once you run out of strokes you will visit a shop',
            x: 550,
            y: 150,
            size: 16
        },
        {
            text: 'Spend your coins to upgrade & allow you to progress through more holes',
            x: 550,
            y: 180,
            size: 16
        },
        {
            text: 'Continue the loop of playing holes, collecting coins, and buying upgrades',
            x: 550,
            y: 210,
            size: 16
        },
        {
            text: 'The goal is to beat all 18 holes in 1 run in the least amount of strokes as you can!',
            x: 550,
            y: 240,
            size: 16
        },
        {
            text: 'Back To Lobby Level',
            x: 800,
            y: 330,
            size: 16
        }
    ]
};

export default tutorialH4;