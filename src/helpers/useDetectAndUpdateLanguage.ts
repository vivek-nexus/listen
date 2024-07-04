import { useArticleStore } from "@/stores/useArticleStore";
import * as cld3Asm from "cld3-asm";
import { useEffect } from "react";

export function useDetectAndUpdateLanguage() {
    const setArticleLanguageCode = useArticleStore((state) => state.setArticleLanguageCode)
    const articleToSpeak = useArticleStore((state) => state.articleToSpeak)

    // Detects and updates articleLanguageCode state variable, whenever articleToSpeak changes
    useEffect(() => {
        // 140 is the default threshold for cld3 to detect language. Defaulting to english for lesser than that, to avoid false guesses.
        if (articleToSpeak.length > 140) {
            // https://codesandbox.io/s/cld3-9qnfu6
            const cldFactoryPromise = cld3Asm.loadModule()

            cldFactoryPromise.then(cldFactory => {
                const identifier = cldFactory.create(140, undefined)
                // Detect only one language, otherwise default to English
                const detectedLanguages = identifier.findMostFrequentLanguages(articleToSpeak, 1)
                identifier.dispose()

                if (detectedLanguages.length > 0 && detectedLanguages[0].is_reliable)
                    setArticleLanguageCode(detectedLanguages[0].language)
                else
                    setArticleLanguageCode(cld3Asm.LanguageCode.EN)
            })
        }
        else
            setArticleLanguageCode(cld3Asm.LanguageCode.EN)
    }, [articleToSpeak])
}