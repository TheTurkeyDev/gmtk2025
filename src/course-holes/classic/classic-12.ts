import type { CourseHole } from '../../types/room';

const sqrt3 = 1.73205;

const getPoints = (x: number, y: number, a: number) => {
    return ([
        { x: a + x, y: y },
        { x: (a / 2) + x, y: ((sqrt3 * a) / 2) + y },
        { x: (-a / 2) + x, y: ((sqrt3 * a) / 2) + y },
        { x: -a + x, y: y },
        { x: (-a / 2) + x, y: (-(sqrt3 * a) / 2) + y },
        { x: (a / 2) + x, y: (-(sqrt3 * a) / 2) + y },
    ]);
};

const course1H12: CourseHole = {
    teeBox: { x: 100, y: 625 },
    holes: [
        {
            nextHole: { courseId: 1, holeNum: 13 },
            x: 1000,
            y: 100,
            size: 10,
            coins: 2
        },
    ],
    walls: [
        { x1: 50, y1: 50, x2: 50, y2: 675 },
        { x1: 50, y1: 675, x2: 1050, y2: 675 },
        { x1: 1050, y1: 675, x2: 1050, y2: 50 },
        { x1: 1050, y1: 50, x2: 50, y2: 50 },
    ],
    coins: [
        { type: 1, x: 143, y: 383, size: 10 },
        { type: 1, x: 956, y: 403, size: 10 },
        { type: 1, x: 228, y: 555, size: 10 },
        { type: 1, x: 540, y: 310, size: 10 },
        { type: 1, x: 810, y: 475, size: 10 },
        { type: 0, x: 318, y: 206, size: 10 },
        { type: 0, x: 457, y: 501, size: 10 },
        { type: 0, x: 212, y: 351, size: 10 },
        { type: 0, x: 380, y: 275, size: 10 },
        { type: 0, x: 571, y: 600, size: 10 },
        { type: 0, x: 680, y: 137, size: 10 },
        { type: 0, x: 173, y: 464, size: 10 },
        { type: 0, x: 823, y: 332, size: 10 },
    ],
    sand: [
        { points: getPoints(622, 337, 36) },
        { points: getPoints(893, 354, 15) },
        { points: getPoints(114, 289, 39) },
        { points: getPoints(721, 580, 26) },
        { points: getPoints(224, 650, 24) },
        { points: getPoints(528, 435, 30) },
        { points: getPoints(103, 463, 17) },
        { points: getPoints(420, 248, 37) },
        { points: getPoints(288, 318, 20) },
        { points: getPoints(753, 146, 38) },
        { points: getPoints(458, 336, 25) },
        { points: getPoints(842, 370, 18) },
        { points: getPoints(598, 489, 36) },
        { points: getPoints(713, 172, 28) },
        { points: getPoints(141, 405, 23) },
        { points: getPoints(916, 511, 56) },
        { points: getPoints(259, 115, 29) },
        { points: getPoints(379, 391, 44) },
        { points: getPoints(1017, 258, 33) },
        { points: getPoints(558, 585, 42) },
        { points: getPoints(745, 201, 39) },
        { points: getPoints(810, 214, 45) },
        { points: getPoints(750, 396, 27) },
    ],
    water: [
        { points: getPoints(528, 120, 39) },
        { points: getPoints(843, 513, 20) },
        { points: getPoints(222, 222, 17) },
        { points: getPoints(521, 614, 15) },
        { points: getPoints(281, 244, 22) },
        { points: getPoints(823, 176, 28) },
        { points: getPoints(327, 411, 17) },
        { points: getPoints(771, 191, 22) },
        { points: getPoints(541, 536, 21) },
        { points: getPoints(171, 286, 27) },
        { points: getPoints(621, 265, 21) },
        { points: getPoints(469, 331, 39) },
        { points: getPoints(861, 436, 53) },
        { points: getPoints(305, 557, 57) },
    ],
    text: [
        {
            text: 'Hole 12: Pot Holes',
            x: 550,
            y: 700,
            size: 18
        }
    ]
};

export default course1H12;