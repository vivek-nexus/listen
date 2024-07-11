import { useArticleStore } from "@/stores/useArticleStore";
import { Voice, usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect } from "react";
import { isLocalStorageSupported } from "../isLocalStorageSupported";

// Choose best voice based on auto detected language and voice availability on the device.

// At least one voice available for the auto detected language:
// A If there is a user preferred voice for this language from a previous session and that voice is available, use that
// B If not 2.1, if there are remote voices, use the first one
// C If neither 2.1 or 2.2, fallback to use auto detected language's first default/non-default voice.

export function useChooseBestVoice() {
    const languageCodeOfArticleToSpeak = useArticleStore((state) => state.languageCodeOfArticleToSpeak)
    const voices = usePlayerStore((state) => state.voices)
    const setVoiceToSpeakWith = usePlayerStore((state) => state.setVoiceToSpeakWith)

    useEffect(() => {
        let voiceToSpeakWith: Voice | undefined = undefined
        let defaultVoices: Voice[] = []
        const voicesOfAutoDetectedLanguage: Voice[] = []

        // Loop through voices on the device
        for (const voice of voices) {
            // Pick up all voices of auto detected language
            if (voice.lang === languageCodeOfArticleToSpeak)
                voicesOfAutoDetectedLanguage.push(voice)
            // Pick up all default voices. Some device have more than one default voice for reasons unknown (may be one default per language?).
            if (voice.default)
                defaultVoices.push(voice)
        }

        // At least one voice available for the auto detected language
        if (voicesOfAutoDetectedLanguage.length !== 0) {
            // A Check if there is a user preferred voice for the auto detected language and if it is available
            if (isLocalStorageSupported()) {
                const voiceName = window.localStorage.getItem(`${languageCodeOfArticleToSpeak}`)
                if (voiceName) {
                    for (const voice of voices) {
                        // Check if that voice is available
                        if (voice.name === voiceName) {
                            voiceToSpeakWith = voice
                            break
                        }
                    }
                }
            }

            // B Check if there are any remote voices
            if (voiceToSpeakWith === undefined) {
                // Pick up the first remote (non local) voice in voicesOfAutoDetectedLanguage
                for (const voice of voicesOfAutoDetectedLanguage) {
                    if (!voice.localService) {
                        voiceToSpeakWith = voice
                    }
                }
            }

            // C Fallback to auto detected language's first default/non-default voice
            if (voiceToSpeakWith === undefined) {
                // Set to the first voice of the auto detected language 
                voiceToSpeakWith = voicesOfAutoDetectedLanguage[0]
                for (const voice of defaultVoices) {
                    // Update to the first default voice of the auto detected language
                    if (voice.lang === languageCodeOfArticleToSpeak) {
                        voiceToSpeakWith = voice
                        break
                    }
                }
            }
        }
        // Dummy voice. When speaking, if this is the value of voiceToSpeakWith, don't provide a voice to speak with. Let the TTS engine decide what voice to use.
        else {
            setVoiceToSpeakWith({
                default: false,
                lang: "en",
                localService: true,
                name: "Default voice",
                value: "default-voice"
            })
        }

        if (voiceToSpeakWith)
            setVoiceToSpeakWith(voiceToSpeakWith)
    }, [voices, languageCodeOfArticleToSpeak])
}