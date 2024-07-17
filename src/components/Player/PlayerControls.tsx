import { getIframeStatus } from "@/helpers/getIframeStatus";
import { useArticleStore } from "@/stores/useArticleStore";
import { useGenericStore } from "@/stores/useGenericStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { MutableRefObject, useEffect, useRef } from "react";
import AnimatedSoundBars from "../AnimatedSoundBars";
import Button from "../Button";
import BackgroundMusicThroughVideo from "./BackgroundMusicThroughVideo";

type SpeechEndReasonRef = "sentence-complete" | "pause" | "forward" | "rewind"

// This component has lot of functions within the body because I did not want to implement ref forwarding :(

export default function PlayerControls() {
    const isMobileOrTablet = useGenericStore((state) => state.isMobileOrTablet)
    const setIsPlayerOpen = useGenericStore((state) => state.setIsPlayerOpen)

    const sentences = useArticleStore((state) => state.sentences)

    const playerState = usePlayerStore((state) => state.playerState)
    const setPlayerState = usePlayerStore((state) => state.setPlayerState)
    const speakingSentenceIndex = usePlayerStore((state) => state.speakingSentenceIndex)
    const setSpeakingSentenceIndex = usePlayerStore((state) => state.setSpeakingSentenceIndex)
    const voiceToSpeakWith = usePlayerStore((state) => state.voiceToSpeakWith)
    const rate = usePlayerStore((state) => state.rate)
    const pitch = usePlayerStore((state) => state.pitch)

    // Get reference to the raw voice
    const rawVoiceToSpeakWith: SpeechSynthesisVoice | undefined = getRawVoiceToSpeakWith()

    const speechEndReasonRef = useRef<SpeechEndReasonRef>("sentence-complete")
    const rewindButton = useRef() as MutableRefObject<HTMLElement>
    const playPauseButton = useRef() as MutableRefObject<HTMLElement>
    const forwardButton = useRef() as MutableRefObject<HTMLElement>

    // Start speaking the first sentence, as soon as the component mounts. Speech will be triggered by change of playerState from "complete" to "playing".
    useEffect(() => {
        setSpeakingSentenceIndex(0)
        setPlayerState("playing")

        // Cancel active speech and reset state variables
        return (() => {
            speechSynthesis.cancel()
            setPlayerState("complete")
            setSpeakingSentenceIndex(0)
        })
    }, [])

    // Speak a sentence, whenever playerState or speakingSentenceIndex change
    // On speech end or on error(needed for Safari), the ref value determines what to do next 
    useEffect(() => {
        // Default ref to sentence-complete. Any other speech end event will update the ref accordingly.
        speechEndReasonRef.current = "sentence-complete"

        if (playerState === "playing") {
            if (("speechSynthesis" in window) && (speakingSentenceIndex < sentences.length)) {
                const utterance = new SpeechSynthesisUtterance(sentences[speakingSentenceIndex])
                // TODO: Hot reload of voice parameters
                // If no voice is available for the auto detected language, then let the TTS engine choose the voice
                if (rawVoiceToSpeakWith && (rawVoiceToSpeakWith.voiceURI !== "default-voice")) {
                    utterance.voice = rawVoiceToSpeakWith
                    utterance.lang = rawVoiceToSpeakWith.lang
                }

                utterance.rate = (rate / 10)
                utterance.pitch = (pitch / 10)

                speechSynthesis.speak(utterance)

                utterance.addEventListener("end", speechCompleteCallback)
                utterance.addEventListener("error", speechCompleteCallback)

                // Clean up event listeners
                return (() => {
                    utterance.removeEventListener("end", speechCompleteCallback)
                    utterance.removeEventListener("error", speechCompleteCallback)
                })
            }
        }
    }, [playerState, speakingSentenceIndex])

    // Pause speech on blur (mobile and tablet)
    // Javascript is killed after a while (unlike desktop browsers) and player state will be a mess
    useEffect(() => {
        if (isMobileOrTablet) {
            window.addEventListener("blur", blurCallback)
            return (() => {
                window.removeEventListener("blur", blurCallback)
            })
        }
    }, [isMobileOrTablet])

    // For cross origin iframes (sites that integrate Listen on their pages), pause speech whenever focus goes outside of iframe.
    // Critical example: Site opens Listen iframe in a modal. After speaking 2 sentences, user decides to stop listening. Instead of clicking the close icon within Listen, they click on close icon of the modal provided by the site. If iframe is not removed from the DOM (instead just set to display: none), then speech will continue in the background.
    useEffect(() => {
        if (getIframeStatus() === "cross-origin-iframe") {
            window.addEventListener("blur", blurCallback)
            return (() => {
                window.removeEventListener("blur", blurCallback)
            })
        }
    }, [])

    // Register keyboard shortcuts for player actions
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])


    // Ref value is used to determine, what to do next
    function speechCompleteCallback() {
        console.log("Speech has ended")
        // Pause using ref value does not work on Safari. The ref value updated by ref setting function, is not reflected in this callback. Just call setPlayerState("paused") in the respective function please.
        if (speechEndReasonRef.current === "pause") {
            setPlayerState("paused")
        }
        if (speechEndReasonRef.current === "forward") {
            setSpeakingSentenceIndex((speakingSentenceIndex + 1))
        }
        if (speechEndReasonRef.current === "rewind") {
            setSpeakingSentenceIndex((speakingSentenceIndex - 1))
        }
        if (speechEndReasonRef.current === "sentence-complete") {
            // Prevent accessing item at (speakingSentenceIndex + 1), that does not exist in sentences
            if ((speakingSentenceIndex + 1) < sentences.length)
                setSpeakingSentenceIndex((speakingSentenceIndex + 1))
            else
                setPlayerState("complete")
        }
    }

    // Setting voiceToSpeakWith as the utterance.voice does not work, since it does not convert to SpeechSynthesisVoice. Hence, picking the corresponding voice from return value of synthesisInterface.getVoices().
    function getRawVoiceToSpeakWith(): SpeechSynthesisVoice | undefined {
        const synthesisInterface = window.speechSynthesis
        const rawVoices = synthesisInterface.getVoices()

        for (const voice of rawVoices) {
            if (voice.name === voiceToSpeakWith.name)
                return voice
        }

        // Most likely, there is no voice available on the device, for the detected language
        return {
            default: false,
            lang: "en",
            localService: true,
            name: "Default voice",
            voiceURI: "default-voice"
        }
    }

    function blurCallback() {
        speechSynthesis.cancel()
        speechEndReasonRef.current = "pause"
        // For Safari
        setPlayerState("paused")
    }

    // Keyboard press callback
    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape")
            setIsPlayerOpen(false)

        // Using button click, since calling rewind(), playPause(), forward() functions mess up the state unpredictably. TODO: Need to figure out why this happens.
        // Button click also causes issues if the element is currently focussed.
        if (event.key === "ArrowLeft")
            rewindButton.current.click()

        if (event.code === "Space") {
            playPauseButton.current.click()
        }

        if (event.key === "ArrowRight")
            forwardButton.current.click()
    }

    // Functions for buttons and keyboard event listeners
    function rewind() {
        // Prevent index from going below 0
        if (speakingSentenceIndex > 0) {
            speechSynthesis.cancel()
            speechEndReasonRef.current = "rewind"
            // To rewind, for cases where the player was in paused state
            setPlayerState("playing")
            setSpeakingSentenceIndex((speakingSentenceIndex - 1))
        }
    }

    function playOrPause() {
        if (playerState === "playing") {
            speechSynthesis.cancel()
            speechEndReasonRef.current = "pause"
            // For Safari
            setPlayerState("paused")
        }
        if (playerState === "paused") {
            setPlayerState("playing")
        }
        if (playerState === "complete") {
            setPlayerState("playing")
            setSpeakingSentenceIndex(0)
        }
    }

    function forward() {
        // Prevent forwarding beyond the last index
        if ((speakingSentenceIndex + 1) < sentences.length) {
            speechSynthesis.cancel()
            speechEndReasonRef.current = "forward"
            // To forward, for cases where the player was in paused state
            setSpeakingSentenceIndex((speakingSentenceIndex + 1))
            setPlayerState("playing")
        }
    }



    return (
        <>
            {/* Mainly to keep mobile devices from going to sleep and killing JS, and for some nice background music. Playing audio does not prevent sleep, so an invisible tiny video. */}
            <BackgroundMusicThroughVideo />
            {/* READING ARTICLE */}
            <div className="flex-grow mx-8 my-6 flex flex-col justify-center">
                {/* Restrict height, without which the reading article container will flex grow and push player controls out of the screen. Hard coded to max-h-32 since percentage does not work with parent that is set to flex-grow. */}
                <p
                    key={speakingSentenceIndex}
                    className="text-center max-h-32 overflow-y-auto custom-scrollbar text-white/60 animate__animated animate__fadeIn"
                >
                    {sentences[speakingSentenceIndex]}
                </p>
            </div>
            {/* PLAYER CONTROLS */}
            <div className="relative">
                <input
                    type="range"
                    min={0}
                    max={sentences.length - 1}
                    step={1}
                    value={speakingSentenceIndex}
                    // To visually offset gap below the input field, absolute and -top-1 is used
                    className="w-full absolute -top-1 accent-primary-800"
                    onChange={(e) => {
                        speechSynthesis.cancel()
                        setSpeakingSentenceIndex(parseInt(e.target.value))
                        setPlayerState("playing")
                    }}
                />
                <div className="bg-primary-800/20 flex gap-4 justify-center items-center px-6 py-6">
                    <Button
                        type="tertiary"
                        className="flex gap-2 items-center"
                        onClick={() => rewind()}
                        isDisabled={speakingSentenceIndex <= 0}
                        toolTipText="Rewind (⬅️)"
                        toolTipPosition="top-left"
                    >
                        <span ref={rewindButton} className="material-icons text-4xl">fast_rewind</span>
                    </Button>
                    <Button
                        type="primary"
                        className="rounded-full w-min flex p-3"
                        onClick={() => playOrPause()}
                        toolTipText="Play/pause (space)"
                        toolTipPosition="top-left"
                    >
                        <span ref={playPauseButton} className="material-icons text-6xl">
                            {playerState === "playing" && `pause`}
                            {((playerState === "paused") || (playerState === "complete")) && `play_arrow`}
                        </span>
                    </Button>
                    <Button
                        type="tertiary"
                        className="flex gap-2 items-center"
                        onClick={() => forward()}
                        isDisabled={(speakingSentenceIndex + 1) >= sentences.length}
                        toolTipText="Forward (➡️)"
                        toolTipPosition="top-left"
                    >
                        <span ref={forwardButton} className="material-icons text-4xl">fast_forward</span>
                    </Button>
                </div>
                <div className="absolute top-2/3 w-full flex justify-center gap-3 blur-[3px] opacity-70">
                    <div className="w-1/4 aspect-square">
                        <AnimatedSoundBars isPlaying={playerState == "playing"} />
                    </div>
                    <div className="w-1/4 aspect-square">
                        <AnimatedSoundBars isPlaying={playerState == "playing"} />
                    </div>
                    <div className="w-1/4 aspect-square">
                        <AnimatedSoundBars isPlaying={playerState == "playing"} />
                    </div>
                    <div className="w-1/4 aspect-square">
                        <AnimatedSoundBars isPlaying={playerState == "playing"} />
                    </div>
                </div>
            </div>
        </>
    )
}