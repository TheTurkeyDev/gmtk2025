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
    coins: [],
    sand: [],
    water: []
};

export default roomData;