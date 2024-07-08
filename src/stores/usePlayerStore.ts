import { create } from "zustand"

interface PlayerStoreState {
    // isPlayerOpen: boolean,
    // setIsPlayerOpen: (isPlayerOpen: boolean) => void
}

export const usePlayerStore = create<PlayerStoreState>((set) => ({
    // isPlayerOpen: false,
    // setIsPlayerOpen: (isPlayerOpen) => set({ isPlayerOpen: isPlayerOpen })
}))