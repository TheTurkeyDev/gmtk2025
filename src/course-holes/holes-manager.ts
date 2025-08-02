import type { CourseHole } from '../types/room';
import course1H1 from './classic/classic-1';
import course1H2 from './classic/classic-2';
import course1H3 from './classic/classic-3';
import course1H4 from './classic/classic-4';
import mainRoom from './main-room';

export function loadCourseHole(courseID: number, holeNum: number): CourseHole | null {

    if (courseID === 1) {
        if (holeNum === 1)
            return { ...course1H1 };
        if (holeNum === 2)
            return { ...course1H2 };
        if (holeNum === 3)
            return { ...course1H3 };
        if (holeNum === 4)
            return { ...course1H4 };
    }
    return mainRoom;
}