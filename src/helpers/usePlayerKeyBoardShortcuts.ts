import { useGenericStore } from "@/stores/useGenericStore"
import { useEffect } from "react"

export function usePlayerKeyBoardShortcuts() {
    const setIsPlayerOpen = useGenericStore((state) => state.setIsPlayerOpen)

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