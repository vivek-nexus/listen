import { create } from "zustand"

export type Item = "rate" | "pitch" | "bgMusicVol"
export type Voice = {
    default: boolean,
    lang: string,
    localService: boolean,
    name: string,
    value: string,
}

// TODO: Explain why complete is needed
type PlayerState = "playing" | "paused" | "complete"

interface PlayerStoreState {
    // 0-20. Divide by 10 during usage
    rate: number,
    // 0-20. Divide by 10 during usage
    pitch: number,
    // 0-100
    bgMusicVol: number,
    incrementStepValue: (item: Item, step: number) => void,
    decrementStepValue: (item: Item, step: number) => void,
    setStepValue: (item: Item, defaultValue: number) => void,
    voices: Array<Voice>
    setVoices: (newVoices: Array<Voice>) => void,
    voiceToSpeakWith: Voice,
    setVoiceToSpeakWith: (newValue: Voice) => void,
    playerState: PlayerState,
    setPlayerState: (newValue: PlayerState) => void,
    speakingSentenceIndex: number,
    setSpeakingSentenceIndex: (newValue: number) => void
}

export const usePlayerStore = create<PlayerStoreState>(
    (set) => ({
        rate: 10,
        pitch: 10,
        bgMusicVol: 10,
        incrementStepValue: (item, step) => set((state) => ({ [item]: (state[item] + step) })),
        decrementStepValue: (item, step) => set((state) => ({ [item]: (state[item] - step) })),
        setStepValue: (item, defaultValue) => set({ [item]: defaultValue }),
        voices: [],
        setVoices: (newVoices: Array<Voice>) => set({ voices: newVoices }),
        voiceToSpeakWith: {
            default: false,
            lang: "en",
            localService: true,
            name: "Default voice",
            value: "default-voice"
        },
        setVoiceToSpeakWith: (newValue: Voice) => set({ voiceToSpeakWith: newValue }),
        playerState: "complete",
        setPlayerState: (newValue: PlayerState) => set({ playerState: newValue }),
        speakingSentenceIndex: 0,
        setSpeakingSentenceIndex: (newValue: number) => set({ speakingSentenceIndex: newValue })
    }))