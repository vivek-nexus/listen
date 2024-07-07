import { usePlayerKeyBoardShortcuts } from "@/helpers/usePlayerKeyBoardShortcuts"
import { useArticleStore } from "@/stores/useArticleStore"
import { usePwaStore } from "@/stores/usePwaStore"
import PlayerControls from "./PlayerControls"
import PlayerHeader from "./PlayerHeader"
import SpeechSettings from "./SpeechSettings"
import { useGenericStore } from "@/stores/useGenericStore"
import { useEffect } from "react"

export default function Player() {
    const isPwaInstallable = usePwaStore((state) => state.isPwaInstallable)

    const setShowToast = useGenericStore((state) => state.setShowToast)
    const setToastType = useGenericStore((state) => state.setToastType)

    const fetchedArticle = useArticleStore((state) => state.fetchedArticle)
    const articleToSpeak = useArticleStore((state) => state.articleToSpeak)

    const tab = useGenericStore((state) => state.tab)

    // Register keyboard shortcuts in the player
    usePlayerKeyBoardShortcuts()

    useEffect(() => {
        setToastType("no-voice-found")
        setShowToast(true)

        // On close of player, reset the toast type back to default and remove any no-voice-found toast
        return () => {
            setToastType("language-detected")
            setShowToast(false)
        }
    }, [])

    return (
        <div className="bg-primary-800/10 lg:bg-primary-800/20 h-full flex flex-col">
            {/* PLAYER HEADER */}
            <div className="mb-12">
                <PlayerHeader />
            </div>

            {/* SPEECH SETTINGS */}
            <div className="px-6">
                <SpeechSettings />
            </div>

            {/* READING ARTICLE */}
            <div className="flex-grow mx-8 my-6 flex flex-col justify-center">
                <p className="text-center max-h-32 overflow-y-auto custom-scrollbar text-white/60 animate__animated animate__fadeIn">
                    {articleToSpeak}
                </p>
                {/* <p className={`hidden font-bold mb-4 overflow-clip text-nowrap text-ellipsis ${styles["width-in-pixels"]}`}>{fetchedArticle.title}</p> */}

                {/* <p
                    // key={currentSentence}
                    // Restrict height, without which the reading article container will flex grow and push player controls out of the screen. Hard coded to h-32 since percentage does not work with parent that is set to flex-grow.
                    className="max-h-32 overflow-y-scroll custom-scrollbar animate__animated animate__fadeIn"
                >
                    {articleToSpeak}

                </p> */}
            </div>

            {/* PLAYER CONTROLS */}
            <div>
                <PlayerControls />
            </div>
        </div >
    )
}