import type { Coin } from './coin';
import type { Hole } from './hole';
import type { Wall } from './wall';

export type Room = {
    holes: Hole[],
    walls: Wall[],
    coins: Coin[]
}