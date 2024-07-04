"use client"

import ArticleForm from "@/components/ArticleForm"
import Player from "@/components/Player"
import { usePlayerStore } from "@/stores/usePlayerStore"

export default function App() {
    const isPlayerOpen = usePlayerStore((state) => state.isPlayerOpen)


    return (
        // PAGE CONTAINER WITH BACKGROUND
        <div className="h-dvh flex justify-center items-center">
            {/* CONTAINER FOR ARTICLE FORM AND PLAYER */}
            <div
                className={`relative w-full h-full lg:rounded-2xl lg:w-[70vw] xl:w-[50vw] lg:h-[80vh]  lg:overflow-clip shadow-container-glow-on-pattern lg:flex lg:flex-row`}
            >
                {/* Mobile: No flex. Article form stays as it is and absolutely positioned player comes over the  article form, for the overlay effect. */}
                {/* Desktop: Flex row. Article form take half each space when the player is open. */}
                {/* CONTAINER FOR ARTICLE FORM*/}
                <div className={`h-full ${isPlayerOpen ? `lg:w-1/2` : `lg:w-full`} duration-500 transition-all`}>
                    <ArticleForm />
                </div>
                {/* CONTAINER FOR PLAYER */}
                {/* w-full needed due to absolute positioning. Bottom-0 needed for animation direction from bottom to top. Overflow clip needed to prevent element contents from showing when height is zero. */}
                <div className={`w-full absolute bottom-0 lg:relative overflow-clip ${isPlayerOpen ? `h-full` : `h-0`} ${isPlayerOpen ? `lg:w-1/2` : `lg:w-0`} duration-500 transition-all`}>
                    {<Player />}
                </div>
            </div>

        </div>
    )
}

