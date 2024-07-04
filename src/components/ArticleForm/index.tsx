import { useDetectAndUpdateLanguage } from "@/helpers/useDetectAndUpdateLanguage"
import { useArticleStore } from "@/stores/useArticleStore"
import { usePlayerStore } from "@/stores/usePlayerStore"
import Link from "next/link"
import { useEffect, useState } from "react"
import Button from "../Button"
import FetchTab from "./FetchTab"
import PasteTab from "./PasteTab"
import { DEFAULT_PASTED_ARTICLE } from "@/constants"
import { useIsMobile } from "@/helpers/useIsMobile"
import { useIsTablet } from "@/helpers/useIsTablet"

export type Tabs = "fetch" | "paste"


export default function ArticleForm() {
    const articleLink = useArticleStore((state) => state.articleLink)
    const fetchedArticle = useArticleStore((state) => state.fetchedArticle)
    const pastedArticle = useArticleStore((state) => state.pastedArticle)
    const articleToSpeak = useArticleStore((state) => state.articleToSpeak)
    const languageCodeOfArticleToSpeak = useArticleStore((state) => state.languageCodeOfArticleToSpeak)
    const isPlayerOpen = usePlayerStore((state) => state.isPlayerOpen)
    const setIsPlayerOpen = usePlayerStore((state) => state.setIsPlayerOpen)
    const setArticleStoreItem = useArticleStore((state) => state.setArticleStoreItem)

    const [tab, setTab] = useState<Tabs>("fetch")
    const [isFetching, setIsFetching] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const isMobile = useIsMobile()
    const isTablet = useIsTablet()


    // Update articleToSpeak
    useEffect(() => {
        if (tab === "fetch")
            setArticleStoreItem("articleToSpeak", fetchedArticle.article)
        if (tab === "paste")
            setArticleStoreItem("articleToSpeak", pastedArticle)
    }, [fetchedArticle, pastedArticle, tab])

    // Custom hook that detects and updates articleLanguageCode state variable, whenever articleToSpeak changes
    useDetectAndUpdateLanguage()

    // Reset default pasted text, if text area is empty in paste tab
    useEffect(() => {
        if ((tab === "paste") && (pastedArticle === ""))
            setArticleStoreItem("pastedArticle", DEFAULT_PASTED_ARTICLE)
    }, [tab])

    useEffect(() => {
        console.log(languageCodeOfArticleToSpeak)

        // Show toast only if there is some articleToSpeak
        if (articleToSpeak !== "")
            setShowToast(true)
        const toastTimeOut = setTimeout(() => {
            setShowToast(false)
        }, 5000)

        // Clear toast and the timeout, if toast firing state variable changes
        return () => {
            clearTimeout(toastTimeOut)
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
                <FetchTab />
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
            {showToast &&
                <div
                    key={languageCodeOfArticleToSpeak}
                    className={`absolute w-full left-0 bg-primary-900 p-1 animate__animated ${(isMobile || isTablet) ? `bottom-0 animate__fadeInUp` : `bottom-0 animate__fadeInUp`} `}
                >
                    <p className="text-center">
                        Auto detected article language: {languageCodeOfArticleToSpeak}
                        {/* Could not fetch the article! You may directly paste the article text. */}
                    </p>
                </div>}
        </div >
    )
}