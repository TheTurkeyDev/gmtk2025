export const Direction = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
} as const;

// Convert object key in a type
export type DirectionType = typeof Direction[keyof typeof Direction]