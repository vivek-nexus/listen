"use client"

import ArticleForm from "@/components/ArticleForm"
import Player from "@/components/Player"
import Toast from "@/components/Toast.tsx"
import { getLanguageName } from "@/helpers/getLanguageName"
import { useFetchArticle } from "@/helpers/handleArticle/useFetchArticle"
import { useArticleStore } from "@/stores/useArticleStore"
import { useGenericStore } from "@/stores/useGenericStore"
import { useEffect } from "react"
import { useChooseBestVoice } from "@/helpers/webSpeech/useChooseBestVoice"
import { isLocalStorageSupported } from "@/helpers/isLocalStorageSupported"
import { usePlayerStore } from "@/stores/usePlayerStore"

export type ToastType = "language-detected" | "fetch-message"

export default function App() {
    const showToast = useGenericStore((state) => state.showToast)
    const setShowToast = useGenericStore((state) => state.setShowToast)
    const toastType = useGenericStore((state) => state.toastType)
    const isPlayerOpen = useGenericStore((state) => state.isPlayerOpen)
    const setTab = useGenericStore((state) => state.setTab)

    const languageCodeOfArticleToSpeak = useArticleStore((state) => state.languageCodeOfArticleToSpeak)
    const setArticleStoreStringItem = useArticleStore((state) => state.setArticleStoreStringItem)
    const setIsFetching = useArticleStore((state) => state.setIsFetching)

    const setStepValue = usePlayerStore((state) => state.setStepValue)

    // Fetches article whenever isFetching is set to true
    useFetchArticle()

    // Read and choose the best voice based on a combination of factors
    useChooseBestVoice()

    // Read local storage preferences
    useEffect(() => {
        if (isLocalStorageSupported()) {
            const rate = window.localStorage.getItem("rate")
            const pitch = window.localStorage.getItem("pitch")
            const bgMusicVol = window.localStorage.getItem("bgMusicVol")

            if (rate)
                setStepValue("rate", parseInt(rate))
            if (pitch)
                setStepValue("pitch", parseInt(pitch))
            if (bgMusicVol)
                setStepValue("bgMusicVol", parseInt(bgMusicVol))
        }
    }, [])

    // Parse URL params
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const paramURLValue = searchParams.get("url")
        const paramTextValue = searchParams.get("text")

        // Fetch article if url is passed
        if ((paramURLValue !== null)) {
            setArticleStoreStringItem("articleLink", paramURLValue)
            setIsFetching(true)
        }
        // Parse text if text is passed. Text may or may not be URL encoded.
        if (paramTextValue !== null) {
            setArticleStoreStringItem("pastedArticle", paramTextValue)
            // SplitArticleToSentencesHelper(paramTextValue, setSentencesArray)
            setTab("paste")
        }
        // If both params are passed, then text is given precedence
    }, [])

    return (
        // PAGE CONTAINER WITH BACKGROUND
        // Over flow clip is needed to control unwanted scroll on mobile device. Can't understand why, but it is needed.
        <div className="h-dvh overflow-clip flex justify-center items-center">
            {/* CONTAINER FOR ARTICLE FORM AND PLAYER */}
            <div
                className={`relative w-full h-full bg-black lg:rounded-2xl lg:w-[70vw] xl:w-[50vw] lg:h-[80vh] lg:overflow-clip shadow-container-glow-on-pattern-2 lg:flex lg:flex-row`}
            >

                {/* CONTAINER FOR ARTICLE FORM*/}
                {/* Mobile: No flex. Article form stays as it is and absolutely positioned player comes over the  article form, for the overlay effect. */}
                {/* Desktop: Flex row. Article form take half each space when the player is open. */}
                <div className={`h-full ${isPlayerOpen ? `lg:w-1/2` : `lg:w-full`} duration-500 transition-all`}>
                    <ArticleForm />
                </div>

                {/* CONTAINER FOR PLAYER */}
                {/* w-full needed due to absolute positioning. Bottom-0 needed for animation direction from bottom to top. Overflow clip needed to prevent element contents from showing when height is zero. */}
                <div className={`bg-black w-full absolute bottom-0 lg:relative overflow-clip ${isPlayerOpen ? `h-full` : `h-0`} ${isPlayerOpen ? `lg:w-1/2 lg:h-full` : `lg:w-0 lg:h-full`} duration-500 transition-all`}>
                    {/* isPlayerOpen added, to avoid unpleasant visual compression of player contents when minimising. */}
                    {isPlayerOpen && <Player />}
                </div>

                {/* TOAST */}
                <Toast
                    showToast={showToast}
                    setShowToast={setShowToast}
                >
                    <p className="text-center">
                        {toastType === "language-detected" &&
                            <>Auto detected article language: {getLanguageName(languageCodeOfArticleToSpeak)}</>
                        }
                        {toastType === "fetch-message" &&
                            <>Could not fetch the article! You may directly paste the article text.</>
                        }

                        {toastType === "no-voice-found" &&
                            <>No {getLanguageName(languageCodeOfArticleToSpeak)} voices found. Using default voice.</>
                        }
                        {toastType === "param-hot-reload" &&
                            <>Changes will be applied when speaking the next sentence</>
                        }
                        {toastType === "install-selected-voice" &&
                            <>Ensure selected voice is installed on your device. Click help icon for instructions.</>
                        }
                    </p>
                </Toast>
                {/* TODO: If articleToSpeak transitions from non English to English and has a blank value during the transition (new fetch or user cleared the article), then toast doesn't show. This is because the language of blank articleToSpeak is en and the language of new English article is also English. */}
            </div>
        </div>
    )
}

