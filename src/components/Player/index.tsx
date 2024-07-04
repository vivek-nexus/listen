import { usePlayerStore } from "@/stores/usePlayerStore"

export default function Player() {
    const setIsPlayerOpen = usePlayerStore((state) => state.setIsPlayerOpen)

    return (
        <>
            <div
                className="bg-primary-800 h-full"
                onClick={() => setIsPlayerOpen(false)}
            >
                Player open
            </div>
        </>
    )
}