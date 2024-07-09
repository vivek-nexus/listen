import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect } from "react";

export function usePopulateVoices() {
    const setVoices = usePlayerStore((state) => state.setVoices)

    useEffect(() => {
        if (window.speechSynthesis) {
            console.log("Speech synthesis supported")
            const synthesisInterface = window.speechSynthesis

            // For browsers that synchronously load voices and return a list immediately
            transformAndSetVoices()

            // Checks if the browser supports asynchronous loading of voices. For reasons not known, calling synthesisInterface.getVoices() is necessary before attempting to check if onvoiceschanged is defined or not (done by calling transformAndSetVoices above). If defined, then wait for the onvoiceschanged to fire and then get the list of voices.
            // TO CHECK ON VARIOUS BROWSERS: transformAndSetVoices callback creates its own synthesisInterface. Will voices be available on that synthesisInterface (will getVoices() work), when callback is executed? Or is it necessary to use the original synthesisInterface? Current result: Works on Chrome, Chrome Android
            if (synthesisInterface.onvoiceschanged !== undefined) {
                synthesisInterface.addEventListener("voiceschanged", transformAndSetVoices)
            }
            // Clean up event listener when component calling this hook unmounts
            return (() => synthesisInterface.removeEventListener("voiceschanged", transformAndSetVoices))
        }
        else {
            console.error("Speech synthesis not supported")
            setVoices([])
        }
    }, [])

    // Gets voices, sorts, cleans up language code to two digits and changes voiceURI key to value (value key name is needed for dropdown to work).
    function transformAndSetVoices() {
        const synthesisInterface = window.speechSynthesis
        const rawVoices = synthesisInterface.getVoices()

        // Sort the array in ascending alphabetical order by the name property
        // Unicode based comparison. localeCompare is used since language names can contain non English characters. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
        rawVoices.sort((a, b) => a.name.localeCompare(b.name));

        const voices = []
        for (const rawVoice of rawVoices) {
            voices.push({
                default: rawVoice.default,
                // Get first two characters for two character language code. Some devices have three character language code before "-" or "_", so taking first two letters is more reliable. Default to English for type safety later on (to circle back).
                lang: rawVoice.lang.slice(0, 2) ? rawVoice.lang.slice(0, 2) : `en`,
                localService: rawVoice.localService,
                name: rawVoice.name,
                value: rawVoice.voiceURI,
            })
        }
        console.log(voices)
        setVoices([...voices])
    }
}