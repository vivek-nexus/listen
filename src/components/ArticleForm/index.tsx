import { DEFAULT_PASTED_ARTICLE } from "@/constants/appConstants"
import { getLanguageName } from "@/helpers/getLanguageName"
import { useDetectAndUpdateLanguage } from "@/helpers/useDetectAndUpdateLanguage"
import { useArticleStore } from "@/stores/useArticleStore"
import { usePlayerStore } from "@/stores/usePlayerStore"
import Link from "next/link"
import { useEffect, useState } from "react"
import Button from "../Button"
import Toast from "../Toast.tsx"
import FetchTab from "./FetchTab"
import PasteTab from "./PasteTab"

export type ToastType = "language-detected" | "fetch-message"

export default function ArticleForm() {
    const tab = useArticleStore((state) => state.tab)
    const fetchedArticle = useArticleStore((state) => state.fetchedArticle)
    const pastedArticle = useArticleStore((state) => state.pastedArticle)
    const articleToSpeak = useArticleStore((state) => state.articleToSpeak)
    const languageCodeOfArticleToSpeak = useArticleStore((state) => state.languageCodeOfArticleToSpeak)
    const isPlayerOpen = usePlayerStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = usePlayerStore((state) => state.setIsPlayerOpen)
    const setArticleStoreStringItem = useArticleStore((state) => state.setArticleStoreStringItem)

    const [showToast, setShowToast] = useState(false)
    const [toastType, setToastType] = useState<ToastType>()
    const [showPlayButton, setShowPlayButton] = useState(false)


    // Update articleToSpeak
    useEffect(() => {
        if (tab === "fetch")
            setArticleStoreStringItem("articleToSpeak", fetchedArticle.article)
        if (tab === "paste")
            setArticleStoreStringItem("articleToSpeak", pastedArticle)
    }, [fetchedArticle, pastedArticle, tab])

    // Custom hook that detects and updates articleLanguageCode state variable, whenever articleToSpeak changes
    useDetectAndUpdateLanguage()

    // Reset default pasted text, if text area is empty in paste tab
    useEffect(() => {
        if ((tab === "paste") && (pastedArticle === ""))
            setArticleStoreStringItem("pastedArticle", DEFAULT_PASTED_ARTICLE)
    }, [tab])

    // Show language toast whenever detected language changes
    useEffect(() => {
        console.log(languageCodeOfArticleToSpeak)
        // Show toast only when non English articleToSpeak exists. Showing toast for English language seems rudimentary. 
        if ((articleToSpeak !== "") && (languageCodeOfArticleToSpeak !== "en")) {
            setToastType("language-detected")
            setShowToast(true)
        }
        else {
            setShowToast(false)
        }
    }, [languageCodeOfArticleToSpeak])

    // Conditionally show or hide play button
    useEffect(() => {
        if (tab === "fetch") {
            if ((fetchedArticle.title !== "") && (fetchedArticle.article !== "") && (!isPlayerOpen))
                setShowPlayButton(true)
            else
                setShowPlayButton(false)
        }
        if (tab === "paste") {
            if ((pastedArticle !== "") && (!isPlayerOpen))
                setShowPlayButton(true)
            else
                setShowPlayButton(false)
        }
    }, [tab, articleToSpeak, isPlayerOpen])

    return (
        // ARTICLE FORM CONTAINER: Fills the height of the parent.
        <div
            className={`relative bg-black p-6 h-full flex flex-col transition-all duration-500
                ${false ? `pointer-events-none touch-none cursor-not-allowed opacity-50` : ``}
                `}
        >

            {/* PAGE TITLE */}
            <Link
                href="/"
                className="flex gap-2 items-center justify-center mt-2 mb-8"
            >
                <span className="material-icons text-4xl text-primary-800">graphic_eq</span>
                <h3 className="text-primary-800 font-bold text-2xl">LISTEN</h3>
            </Link>

            {/* TABS */}
            <div className="flex w-max mx-auto mb-8 bg-primary-800/30 rounded-full">
                <Button
                    type={tab === "fetch" ? `primary` : `tertiary`}
                    className="px-6 py-2"
                    isDisabled={isPlayerOpen}
                    toolTipText={`${isPlayerOpen ? `Close player to change tab` : ``}`}
                    toolTipPosition="bottom-left"
                    onClick={() => {
                        if (!isPlayerOpen)
                            setArticleStoreStringItem("tab", "fetch")
                    }}
                >
                    Fetch article
                </Button>
                <Button
                    type={tab === "paste" ? `primary` : `tertiary`}
                    className="px-6 py-2"
                    isDisabled={isPlayerOpen}
                    toolTipText={`${isPlayerOpen ? `Close player to change tab` : ``}`}
                    toolTipPosition="bottom-left"
                    onClick={() => {
                        if (!isPlayerOpen)
                            setArticleStoreStringItem("tab", "paste")
                    }}
                >
                    Paste article
                </Button>
            </div>

            {/* FETCH TAB */}
            {tab === "fetch" &&
                <FetchTab
                    setShowToast={setShowToast}
                    setToastType={setToastType}
                />
            }
            {/* PASTE TAB */}
            {tab === "paste" &&
                <PasteTab />
            }

            {/* PLAY BUTTON */}
            {(showPlayButton) &&
                <div
                    className="fixed bottom-8 w-min mx-auto right-0 left-0 flex justify-center lg:absolute lg:bottom-8 animate__animated animate__fadeInUp"
                    style={{
                        animationDelay: `0.25s`
                    }}
                >
                    <Button
                        type="primary"
                        className="rounded-full flex p-3"
                        onClick={() => {
                            setIsPlayerOpen(true)
                        }}
                    >
                        <span className="material-icons text-6xl">play_arrow</span>
                    </Button>
                </div>
            }

            {/* TOAST */}
            {/* TODO: If articleToSpeak transitions from non English to English and has a blank value during the transition (new fetch or user cleared the article), then toast doesn't show. This is because the language of blank articleToSpeak is en and the language of new English article is also English. */}
            {/* Toast is cleaned up if ArticleForm component re-renders, irrespective of keysToCleanup, since Toast is a child of ArticleForm. */}
            <Toast
                keysToCleanUp={[languageCodeOfArticleToSpeak, articleToSpeak]}
                showToast={showToast}
                setShowToast={setShowToast}
            >
                <p className="text-center">
                    {toastType === "language-detected" && <>Auto detected article language: {getLanguageName(languageCodeOfArticleToSpeak)}</>}
                    {toastType === "fetch-message" && <>Could not fetch the article! You may directly paste the article text.</>}
                </p>
            </Toast>
        </div >
    )
}