import { useArticleStore } from "@/stores/useArticleStore"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { useState } from "react"
import Input from "../Input"
import Button from "../Button"
import AnimatedEye from "../AnimatedEye"
import { Tabs } from "."

export default function FetchTab() {
    const articleLink = useArticleStore((state) => state.articleLink)
    const fetchedArticle = useArticleStore((state) => state.fetchedArticle)
    const languageCodeOfArticleToSpeak = useArticleStore((state) => state.languageCodeOfArticleToSpeak)
    const setArticleStoreItem = useArticleStore((state) => state.setArticleStoreItem)

    const [tab, setTab] = useState<Tabs>("fetch")
    const [isFetching, setIsFetching] = useState(false)

    return (
        <div className="flex-grow min-h-0 flex flex-col animate__animated animate__fadeIn">
            <div
                key={articleLink}
                className={`relative mb-12 ${`animate__animated animate__pulse`}`}>
                <Input
                    placeholder="Link to article"
                    value={articleLink}
                    onChange={(event) => {
                        setArticleStoreItem("articleLink", event.target.value)
                    }}
                />
                <Button
                    type="primary"
                    className="absolute right-0 rounded-l-none py-2 px-4 h-full"
                >
                    Fetch
                </Button>
            </div>
            {/* EYES: Follows mouse or shows loading state. Grows to take the the available space in article form container. */}
            {(!fetchedArticle.title || !fetchedArticle.article) &&
                <div
                    className="flex-grow cursor-pointer animate__animated animate__bounceIn flex flex-col justify-center items-center"
                    onClick={() =>
                        setArticleStoreItem("articleLink", "https://ideas.ted.com/how-to-handle-anxiety-lionel-messi/")}
                >
                    <div
                        className={`flex gap-4 justify-center w-min mb-6`}
                    >
                        <AnimatedEye isLoading={false} />
                        <AnimatedEye isLoading={false} />
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