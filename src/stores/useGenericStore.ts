import { create } from "zustand"

type ToastType = "language-detected" | "fetch-message" | "no-voice-found"
type TabsType = "fetch" | "paste"

interface GenericStoreState {
    showToast: boolean,
    setShowToast: (showToast: boolean) => void,
    toastType: ToastType,
    setToastType: (toastType: ToastType) => void,
    tab: "fetch" | "paste",
    setTab: (tab: TabsType) => void,
    isPlayerOpen: boolean,
    setIsPlayerOpen: (isPlayerOpen: boolean) => void
}

export const useGenericStore = create<GenericStoreState>((set) => ({
    showToast: false,
    setShowToast: (showToast) => set({ showToast: showToast }),
    toastType: "language-detected",
    setToastType: (toastType) => set({ toastType: toastType }),
    tab: "fetch",
    setTab: (tab) => set({ tab: tab }),
    isPlayerOpen: false,
    setIsPlayerOpen: (isPlayerOpen) => set({ isPlayerOpen: isPlayerOpen })
}))