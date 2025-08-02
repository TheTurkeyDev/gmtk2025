import type { Coin } from './coin';
import type { Hole } from './hole';
import type { HoleText } from './hole-text';
import type { Position } from './position';
import type { SandTrap } from './sand-trap';
import type { Wall } from './wall';
import type { WaterHazard } from './water-hazard';

export type CourseHole = {
    teeBox: Position,
    holes: Hole[],
    walls: Wall[],
    coins: Coin[],
    sand: SandTrap[],
    water: WaterHazard[],
    text: HoleText[]
}