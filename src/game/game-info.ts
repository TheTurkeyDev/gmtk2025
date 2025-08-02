export const gameSettingsDef = {
    maxDragDist: {
        initial: 50,
        min: 0,
        max: 500
    },
    friction: {
        initial: 0.93,
        min: 0,
        max: 1
    },
    sandFriction: {
        initial: 0.8,
        min: 0,
        max: 1
    },
    shotStrength: {
        initial: 30,
        min: 0,
        max: 100
    },
    wallEnergyLoss: {
        initial: 0.3,
        min: 0.01,
        max: 1
    },
    roomChangeSpeed: {
        initial: 700,
        min: 1,
        max: 99999
    },
    holeSizeInc: {
        initial: 0,
        min: 0,
        max: 40
    },
};
export const gameSettings = {
    maxDragDist: gameSettingsDef.maxDragDist.initial,
    friction: gameSettingsDef.friction.initial,
    sandFriction: gameSettingsDef.sandFriction.initial,
    shotStrength: gameSettingsDef.shotStrength.initial,
    wallEnergyLoss: gameSettingsDef.wallEnergyLoss.initial,
    roomChangeSpeed: gameSettingsDef.roomChangeSpeed.initial,
    holeSizeInc: gameSettingsDef.holeSizeInc.initial,
};

export const resetGameSettings = () => Object.keys(gameSettingsDef).forEach(key => gameSettings[key as keyof typeof gameSettingsDef] = gameSettingsDef[key as keyof typeof gameSettingsDef].initial);

export const playerInfoDef = {
    totalStrokes: 10,
    strokesLeft: 10,
    strokesTaken: 0,
    penaltyStrokes: 0,
    coins: 0
};
export const playerInfo = { ...playerInfoDef };
export const resetPlayerInfo = () => Object.keys((key: keyof typeof playerInfoDef) => playerInfo[key] = playerInfoDef[key]);