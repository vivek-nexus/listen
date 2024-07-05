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
import AnimatedSoundBars from "../AnimatedSoundBars"

export default function Player() {
    const setIsPlayerOpen = usePlayerStore((state) => state.setIsPlayerOpen)
    const fetchedArticle = useArticleStore((state) => state.fetchedArticle)
    const isPwaInstallable = usePwaStore((state) => state.isPwaInstallable)

    const tab = useArticleStore((state) => state.tab)

    // Register keyboard shortcuts in the player
    usePlayerKeyBoardShortcuts()

    return (
        <div className="bg-primary-800/10 lg:bg-primary-800/20 h-full flex flex-col"
        >
            {/* TOP PLAYER BAR */}
            <div className="bg-primary-800/30 px-6 py-3 lg:mb-12 flex gap-2 items-center justify-between">
                {/* CLOSE ICON + ARTICLE TITLE */}
                <Button
                    type="tertiary"
                    // Max width necessary to give definite width, which is used in calc function of width-in-pixels class of p child tag
                    className={`flex gap-2 items-center ${isPwaInstallable ? `max-w-[75%]` : `max-w-full`} overflow-clip`}
                    onClick={() => setIsPlayerOpen(false)}
                >
                    <span className="material-icons text-xl">close</span>
                    {/* overflow-clip + text-nowrap + text-ellipsis needed to get the ... for long titles. Width in pixels needed for ellipsis to work, % widths won't work.*/}
                    <p className={`text-white/70 font-bold overflow-clip text-nowrap text-ellipsis ${styles["width-in-pixels"]}`}>
                        {tab === "fetch" ? fetchedArticle.title : `Pasted article`}
                    </p>
                </Button>

                {/* PWA ICON */}
                {isPwaInstallable &&
                    <Button
                        type="tertiary"
                        className="flex gap-2 items-center"
                        onClick={fireInstallPrompt}
                    >
                        <span className="lg:hidden material-icons text-xl">install_mobile</span>
                        <span className="hidden lg:block material-icons text-2xl">install_desktop</span>
                    </Button>
                }
            </div>

            {/* SPEECH SETTINGS */}


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