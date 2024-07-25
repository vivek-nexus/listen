import { useGenericStore } from "@/stores/useGenericStore"
import { useEffect } from "react"

// Unused custom hook. To be brought back once all keyboard actions are moved to this hook.
export function usePlayerKeyBoardShortcuts() {
    const setIsPlayerOpen = useGenericStore((state) => state.setIsPlayerOpen)

    function closePlayer(event: KeyboardEvent) {
        if (event.key === "Escape") {
            setIsPlayerOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", closePlayer)
        return () => {
            document.removeEventListener("keydown", closePlayer)
        }
    }, [])
}