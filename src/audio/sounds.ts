export const golfBallInHoleSound = new Audio('sounds/golf_ball_in_hole.mp3');
export const golfPuttSound = new Audio('sounds/golf_putt.mp3');
export const golfBallWaterSound = new Audio('sounds/golf_ball_in_water.mp3');
export const coinPickupSound = new Audio('sounds/coin_pickup.mp3');
export const music = new Audio('sounds/music.mp3');

export let masterVolume = 0.75;
export let sfxVolume = 0.75;
export let musicVolume = 0.5;

export function initSounds() {
    music.loop = true;

    const localMasterVolume = parseFloat(localStorage.getItem('masterVolume') ?? `${masterVolume}`);
    if (!isNaN(localMasterVolume))
        masterVolume = localMasterVolume;

    const localSFXVolume = parseFloat(localStorage.getItem('sfxVolume') ?? `${sfxVolume}`);
    if (!isNaN(localSFXVolume))
        sfxVolume = localSFXVolume;

    const localMusicVolume = parseFloat(localStorage.getItem('musicVolume') ?? `${musicVolume}`);
    if (!isNaN(localMusicVolume))
        musicVolume = localMusicVolume;

    setMasterVolume(masterVolume);
    setSFXVolume(sfxVolume);
    setMusicVolume(musicVolume);
}

export function setMasterVolume(mv: number) {
    masterVolume = mv;
    localStorage.setItem('masterVolume', `${mv}`);
    golfBallInHoleSound.volume = sfxVolume * mv;
    golfPuttSound.volume = sfxVolume * mv;
    golfBallWaterSound.volume = sfxVolume * mv;
    coinPickupSound.volume = sfxVolume * mv * 0.4;
    music.volume = musicVolume * mv;
}

export function setSFXVolume(v: number) {
    sfxVolume = v;
    localStorage.setItem('sfxVolume', `${v}`);
    golfBallInHoleSound.volume = v * masterVolume;
    golfPuttSound.volume = v * masterVolume;
    golfBallWaterSound.volume = v * masterVolume;
    coinPickupSound.volume = v * masterVolume * 0.4;
}

export function setMusicVolume(v: number) {
    musicVolume = v;
    localStorage.setItem('musicVolume', `${v}`);
    music.volume = v * masterVolume;
}