import { useArticleStore } from "@/stores/useArticleStore"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react"
import Input from "../Input"
import Button from "../Button"
import AnimatedEye from "../AnimatedEye"
import { ToastType } from "."
import { fetchArticle } from "@/helpers/fetchArticle"

type FetchTabProps = {
    setShowToast: Dispatch<SetStateAction<boolean>>,
    setToastType: Dispatch<SetStateAction<ToastType | undefined>>
}

export default function FetchTab({ setShowToast, setToastType }: FetchTabProps) {
    const articleLink = useArticleStore((state) => state.articleLink)
    const fetchedArticle = useArticleStore((state) => state.fetchedArticle)
    const languageCodeOfArticleToSpeak = useArticleStore((state) => state.languageCodeOfArticleToSpeak)
    const setArticleStoreStringItem = useArticleStore((state) => state.setArticleStoreStringItem)
    const setFetchedArticle = useArticleStore((state) => state.setFetchedArticle)
    const isPlayerOpen = usePlayerStore((state) => state.isPlayerOpen)

    const [isFetching, setIsFetching] = useState(false)
    const articleLinkRef = useRef() as MutableRefObject<HTMLDivElement>

    function handleFetchButtonClick() {
        // Fetch only if there is non empty link
        if ((articleLink !== "") && (!isPlayerOpen)) {
            setFetchedArticle("title", "")
            setFetchedArticle("article", "")
            setIsFetching(true)
            fetchArticle(articleLink).then((fetchedArticle) => {
                setIsFetching(false)
                if (fetchedArticle.title !== "" && fetchedArticle.article !== "") {
                    setFetchedArticle("title", fetchedArticle.title)
                    setFetchedArticle("article", fetchedArticle.article)
                }
                else {
                    setToastType("fetch-message")
                    setShowToast(true)
                }
            })
        }
    }

    return (
        <div className="flex-grow min-h-0 flex flex-col animate__animated animate__fadeIn">
            <div
                ref={articleLinkRef}
                className="relative mb-12">
                <Input
                    placeholder="Link to article"
                    value={articleLink}
                    onChange={(event) => {
                        setArticleStoreStringItem("articleLink", event.target.value)
                    }}
                />
                <div className="absolute inline-block right-0 h-full">
                    <Button
                        type="primary"
                        className="rounded-l-none py-2 px-4 "
                        onClick={handleFetchButtonClick}
                        isDisabled={(articleLink === "") || isPlayerOpen}
                        toolTipText={isPlayerOpen ? `Close player to fetch` : (articleLink === "" ? `Please provide a link` : ``)}
                        toolTipPosition="bottom-right"
                    >
                        Fetch
                    </Button>
                </div>
            </div>
            {/* EYES: Follows mouse or shows loading state. Grows to take the the available space in article form container. */}
            {(!fetchedArticle.title || !fetchedArticle.article) &&
                <div
                    className="flex-grow cursor-pointer animate__animated animate__bounceIn flex flex-col justify-center items-center"
                    onClick={() => {
                        setArticleStoreStringItem("articleLink", "https://ideas.ted.com/how-to-handle-anxiety-lionel-messi/")
                        // Animate populating the input field, to draw attention
                        articleLinkRef.current.classList.add('animate__animated', 'animate__pulse')
                    }}
                >
                    <div
                        className={`flex gap-4 justify-center w-min mb-6`}
                    >
                        <AnimatedEye isLoading={isFetching} />
                        <AnimatedEye isLoading={isFetching} />
                    </div>
                    <p
                        className=" text-primary-800 ">
                        {isFetching ? `Fetching, hold on...` : `Need a nice link?`}
                    </p>
                </div>}
            {/* FETCHED ARTICLE: Grows to take the the available space in article form container. */}
            {(fetchedArticle.title && fetchedArticle.article) &&
                <div className="flex-grow flex flex-col min-h-0 overflow-clip rounded-lg animate__animated animate__fadeIn">
                    {/* FETCHED ARTICLE TITLE */}
                    <div className="px-6 py-4 bg-primary-800/40 font-bold">
                        <a href={articleLink} target="_blank">
                            <p className="underline-none hover:underline hover:underline-offset-4">
                                {fetchedArticle.title}
                            </p>
                        </a>
                    </div>
                    {/* FETCHED ARTICLE TEXT */}
                    <div className="p-6 bg-primary-800/30 overflow-y-auto pointer-events-auto cursor-auto custom-scrollbar text-white/60">
                        <p>{fetchedArticle.article}</p>
                    </div>
                </div>}
        </div>
    )
}