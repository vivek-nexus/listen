import { usePlayerKeyBoardShortcuts } from "@/helpers/usePlayerKeyBoardShortcuts"
import PlayerControls from "./PlayerControls"
import PlayerHeader from "./PlayerHeader"
import SpeechSettings from "./SpeechSettings"
import { useEffect } from "react"
import { useGenericStore } from "@/stores/useGenericStore"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { useIsMobile } from "@/helpers/useIsMobile"
import { useIsTablet } from "@/helpers/useIsTablet"

export default function Player() {
    const setShowToast = useGenericStore((state) => state.setShowToast)
    const setToastType = useGenericStore((state) => state.setToastType)

    const voiceToSpeakWith = usePlayerStore((state) => state.voiceToSpeakWith)


    // Register keyboard shortcuts in the player
    usePlayerKeyBoardShortcuts()

    const isMobile = useIsMobile()
    const isTablet = useIsTablet()

    // Show toasts
    useEffect(() => {
        // If voiceToSpeakWith is dummy (no voice found for auto detected language)
        if ((voiceToSpeakWith.value === "default-voice")) {
            setShowToast(true)
            setToastType("no-voice-found")
        }
        // If voiceToSpeakWith is defined
        else {
            // Show informational toast on mobile and tablet
            if (isMobile || isTablet) {
                setShowToast(true)
                setToastType("install-selected-voice")
            }
        }
        // Toast clean up done by the useEffect in index.tsx to prevent set and clean up conflicts within components (that are trying to show toasts) of Player
        return (() => {
            setShowToast(false)
            setToastType("language-detected")
        })
    }, [])

    // Clean up any toasts from all components inside the player
    useEffect(() => {

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

            {/* READING ARTICLE AND PLAYER CONTROLS */}
            <PlayerControls />
        </div >
    )
}