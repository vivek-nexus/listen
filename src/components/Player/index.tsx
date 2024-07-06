import { usePlayerStore } from "@/stores/usePlayerStore"
import Button from "../Button"
import { useArticleStore } from "@/stores/useArticleStore"
import { fireInstallPrompt } from "@/helpers/handlePwaLifeCycle/fireInstallPrompt"
import { useIsPwaInstallable } from "@/helpers/handlePwaLifeCycle/useIsPwaInstallable"
import { usePwaStore } from "@/stores/usePwaStore"
import styles from "./Player.module.css"
import { useEffect } from "react"
import { usePlayerKeyBoardShortcuts } from "@/helpers/usePlayerKeyBoardShortcuts"
import PlayerControls from "./PlayerControls"
import SpeechSettings from "./SpeechSettings"
import AnimatedSoundBars from "../AnimatedSoundBars"
import PlayerHeader from "./PlayerHeader"

export default function Player() {
    const setIsPlayerOpen = usePlayerStore((state) => state.setIsPlayerOpen)
    const fetchedArticle = useArticleStore((state) => state.fetchedArticle)
    const isPwaInstallable = usePwaStore((state) => state.isPwaInstallable)

    const tab = useArticleStore((state) => state.tab)

    // Register keyboard shortcuts in the player
    usePlayerKeyBoardShortcuts()

    return (
        <div className="bg-primary-800/10 lg:bg-primary-800/20 h-full flex flex-col">
            {/* PLAYER HEADER */}
            <PlayerHeader />

            {/* SPEECH SETTINGS */}
            <div className="px-6">
                <SpeechSettings />
            </div>

            {/* READING ARTICLE */}
            <div className="flex-grow mx-6 my-6 flex flex-col justify-center">
                <p className={`mb-8 text-center text-primary-800 `}>
                    100%
                </p>
                <p
                    // key={currentSentence}
                    // Restrict height, without which the reading article container will flex grow and push player controls out of the screen. Hard coded to h-32 since percentage does not work with parent that is set to flex-grow.
                    className="text-center max-h-32 overflow-y-scroll custom-scrollbar animate__animated animate__fadeIn"
                >
                    This is a sample pasted text. You can use this tool to listen to news or web pages, just like a podcast. You can also use it to proof-read your articles, explore pronunciation or even just to have fun!

                </p>
            </div>

            {/* PLAYER CONTROLS */}
            <div>
                <PlayerControls />
            </div>
        </div >
    )
}