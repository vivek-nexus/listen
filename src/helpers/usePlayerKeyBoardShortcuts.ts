import { usePlayerStore } from "@/stores/usePlayerStore"
import { useEffect } from "react"

export function usePlayerKeyBoardShortcuts() {
    const setIsPlayerOpen = usePlayerStore((state) => state.setIsPlayerOpen)

    function closePlayer(event: KeyboardEvent) {
        if (event.key === "Escape")
            setIsPlayerOpen(false)
    }

    useEffect(() => {
        document.addEventListener("keydown", closePlayer)
        return () => {
            document.removeEventListener("keydown", closePlayer)
        }
    }, [])
}