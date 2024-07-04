import { create } from "zustand"

interface PwaStoreState {
    isPwaInstallable: boolean,
    setIsPwaInstallable: (isPwaInstallable: boolean) => void
}

export const usePwaStore = create<PwaStoreState>((set) => ({
    isPwaInstallable: false,
    setIsPwaInstallable: (isPwaInstallable) => set({ isPwaInstallable: isPwaInstallable })
}))