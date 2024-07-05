import { useDetectAndUpdateLanguage } from "@/helpers/useDetectAndUpdateLanguage"
import { useArticleStore } from "@/stores/useArticleStore"
import { usePlayerStore } from "@/stores/usePlayerStore"
import Link from "next/link"
import { useEffect, useState } from "react"
import Button from "../Button"
import FetchTab from "./FetchTab"
import PasteTab from "./PasteTab"
import { DEFAULT_PASTED_ARTICLE } from "@/constants/appConstants"
import { useIsMobile } from "@/helpers/useIsMobile"
import { useIsTablet } from "@/helpers/useIsTablet"
import Toast from "../Toast.tsx"
import { getLanguageName } from "@/helpers/getLanguageName"

export type Tabs = "fetch" | "paste"
export type ToastType = "language-detected" | "fetch-message"


export default function ArticleForm() {
    const articleLink = useArticleStore((state) => state.articleLink)
    const fetchedArticle = useArticleStore((state) => state.fetchedArticle)
    const pastedArticle = useArticleStore((state) => state.pastedArticle)
    const articleToSpeak = useArticleStore((state) => state.articleToSpeak)
    const languageCodeOfArticleToSpeak = useArticleStore((state) => state.languageCodeOfArticleToSpeak)
    const isPlayerOpen = usePlayerStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = usePlayerStore((state) => state.setIsPlayerOpen)
    const setArticleStoreStringItem = useArticleStore((state) => state.setArticleStoreStringItem)

    const [tab, setTab] = useState<Tabs>("fetch")
    const [isFetching, setIsFetching] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastType, setToastType] = useState<ToastType>()


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
                    onClick={() => setTab("fetch")}
                >
                    Fetch article
                </Button>
                <Button
                    type={tab === "paste" ? `primary` : `tertiary`}
                    className="px-6 py-2"
                    onClick={() => setTab("paste")}
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
            {(fetchedArticle.title && fetchedArticle.article) &&
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
            {/* TODO: Recollect why I made keysToCleanup as an array and I wanted to include pastedArticle in the array. */}
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