import PlayerControls from "./PlayerControls"
import PlayerHeader from "./PlayerHeader"
import SpeechSettings from "./SpeechSettings"
import { useEffect } from "react"
import { useGenericStore } from "@/stores/useGenericStore"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { useIsMobileOnClient } from "@/helpers/useIsMobileOnClient"
import { useIsTabletOnClient } from "@/helpers/useIsTabletOnClient"
import { useIsFrequentListener } from "@/helpers/useIsFrequentListener"

// https://dev.to/jankapunkt/cross-browser-speech-synthesis-the-hard-way-and-the-easy-way-353

export default function Player() {
    const isFrequentListener = useGenericStore((state) => state.isFrequentListener)
    const setShowToast = useGenericStore((state) => state.setShowToast)
    const setToastType = useGenericStore((state) => state.setToastType)

    const voiceToSpeakWith = usePlayerStore((state) => state.voiceToSpeakWith)

    const isMobile = useIsMobileOnClient()
    const isTablet = useIsTabletOnClient()

    // Register custom hook to increment count as well as determine current frequent listener status
    useIsFrequentListener()

    // Show toasts
    useEffect(() => {
        // Component mount also comes with an animation, toast also has animation. Add delay so that both don't mixed with each other and user misses the toast.
        const timeout = setTimeout(() => {
            // If voiceToSpeakWith is dummy (no voice found for auto detected language)
            if ((voiceToSpeakWith.value === "default-voice")) {
                setShowToast(true)
                setToastType("no-voice-found")
            }
            // If voiceToSpeakWith is defined
            else {
                // Show informational toast on mobile and tablet, since generally desktop voice data doesn't need explicit downloading
                // Don't show if the user is a frequent listener
                if ((isMobile || isTablet) && !isFrequentListener) {
                    setShowToast(true)
                    setToastType("install-selected-voice")
                }
            }
        }, 500)
        return (() => {
            clearTimeout(timeout)
            // This also cleans up any toast created by children of the Player component (like "param-hot-reload" toast by the dropdown)
            setShowToast(false)
            setToastType("language-detected")
        })
    }, [isMobile, isTablet])

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