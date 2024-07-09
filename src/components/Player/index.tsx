import { usePlayerKeyBoardShortcuts } from "@/helpers/usePlayerKeyBoardShortcuts"
import { useArticleStore } from "@/stores/useArticleStore"
import PlayerControls from "./PlayerControls"
import PlayerHeader from "./PlayerHeader"
import SpeechSettings from "./SpeechSettings"

export default function Player() {
    const articleToSpeak = useArticleStore((state) => state.articleToSpeak)

    // Register keyboard shortcuts in the player
    usePlayerKeyBoardShortcuts()

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
                {/* Restrict height, without which the reading article container will flex grow and push player controls out of the screen. Hard coded to max-h-32 since percentage does not work with parent that is set to flex-grow. */}
                <p className="text-center max-h-32 overflow-y-auto custom-scrollbar text-white/60 animate__animated animate__fadeIn">
                    {articleToSpeak}
                </p>
            </div>

            {/* PLAYER CONTROLS */}
            <div>
                <PlayerControls />
            </div>
        </div >
    )
}