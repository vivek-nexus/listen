import { create } from "zustand"

type ToastType = "language-detected" | "fetch-message" | "no-voice-found" | "install-selected-voice" | "param-hot-reload"
type TabsType = "fetch" | "paste"

interface GenericStoreState {
    isFrequentListener: boolean,
    setIsFrequentListener: (newValue: boolean) => void,
    showToast: boolean,
    setShowToast: (newValue: boolean) => void,
    toastType: ToastType,
    setToastType: (newValue: ToastType) => void,
    tab: "fetch" | "paste",
    setTab: (tab: TabsType) => void,
    isPlayerOpen: boolean,
    setIsPlayerOpen: (newValue: boolean) => void
}

export const useGenericStore = create<GenericStoreState>(
    (set) => ({
        isFrequentListener: false,
        setIsFrequentListener: (newValue) => set({ isFrequentListener: newValue }),
        showToast: false,
        setShowToast: (newValue) => set({ showToast: newValue }),
        toastType: "language-detected",
        setToastType: (newValue) => set({ toastType: newValue }),
        tab: "fetch",
        setTab: (tab) => set({ tab: tab }),
        isPlayerOpen: false,
        setIsPlayerOpen: (newValue) => set({ isPlayerOpen: newValue })
    }))