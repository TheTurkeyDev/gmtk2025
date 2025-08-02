import type { CourseHole } from '../types/room';
import course1H1 from './classic/classic-1';
import course1H10 from './classic/classic-10';
import course1H11 from './classic/classic-11';
import course1H12 from './classic/classic-12';
import course1H13 from './classic/classic-13';
import course1H14 from './classic/classic-14';
import course1H15 from './classic/classic-15';
import course1H16 from './classic/classic-16';
import course1H17 from './classic/classic-17';
import course1H171 from './classic/classic-17-1';
import course1H172 from './classic/classic-17-2';
import course1H173 from './classic/classic-17-3';
import course1H174 from './classic/classic-17-4';
import course1H18 from './classic/classic-18';
import course1H2 from './classic/classic-2';
import course1H3 from './classic/classic-3';
import course1H4 from './classic/classic-4';
import course1H5 from './classic/classic-5';
import course1H6 from './classic/classic-6';
import course1H7 from './classic/classic-7';
import course1H8 from './classic/classic-8';
import course1H9 from './classic/classic-9';
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
        if (holeNum === 5)
            return { ...course1H5 };
        if (holeNum === 6)
            return { ...course1H6 };
        if (holeNum === 7)
            return { ...course1H7 };
        if (holeNum === 8)
            return { ...course1H8 };
        if (holeNum === 9)
            return { ...course1H9 };
        if (holeNum === 10)
            return { ...course1H10 };
        if (holeNum === 11)
            return { ...course1H11 };
        if (holeNum === 12)
            return { ...course1H12 };
        if (holeNum === 13)
            return { ...course1H13 };
        if (holeNum === 14)
            return { ...course1H14 };
        if (holeNum === 15)
            return { ...course1H15 };
        if (holeNum === 16)
            return { ...course1H16 };
        if (holeNum === 17)
            return { ...course1H17 };
        if (holeNum === 18)
            return { ...course1H18 };


        if (holeNum === 171)
            return { ...course1H171 };
        if (holeNum === 172)
            return { ...course1H172 };
        if (holeNum === 173)
            return { ...course1H173 };
        if (holeNum === 174)
            return { ...course1H174 };
        
    }
    return mainRoom;
}