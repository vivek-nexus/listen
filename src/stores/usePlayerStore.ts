import { create } from "zustand"

export type Item = "rate" | "pitch" | "bgMusicVol"

interface PlayerStoreState {
    // 0-20. Divide by 10 during usage
    rate: number,
    // 0-20. Divide by 10 during usage
    pitch: number,
    // 0-100
    bgMusicVol: number,
    incrementStepValue: (item: Item, step: number) => void,
    decrementStepValue: (item: Item, step: number) => void,
    resetStepValue: (item: Item, defaultValue: number) => void,
}

export const usePlayerStore = create<PlayerStoreState>((set) => ({
    rate: 10,
    pitch: 10,
    bgMusicVol: 10,
    incrementStepValue: (item, step) => set((state) => ({ [item]: (state[item] + step) })),
    decrementStepValue: (item, step) => set((state) => ({ [item]: (state[item] - step) })),
    resetStepValue: (item, defaultValue) => set({ [item]: defaultValue })
}))