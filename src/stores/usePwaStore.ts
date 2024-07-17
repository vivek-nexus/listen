import { create } from "zustand"

interface PwaStoreState {
    isPwaInstallable: boolean,
    setIsPwaInstallable: (newValue: boolean) => void
}

export const usePwaStore = create<PwaStoreState>(
    (set) => ({
        isPwaInstallable: false,
        setIsPwaInstallable: (newValue) => set({ isPwaInstallable: newValue })
    })
)