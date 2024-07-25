import { useArticleStore } from "@/stores/useArticleStore"
import { useGenericStore } from "@/stores/useGenericStore"
import { MutableRefObject, useRef } from "react"
import AnimatedEye from "../AnimatedEye"
import Button from "../Button"
import Input from "../Input"

export default function FetchTab() {
    const isPlayerOpen = useGenericStore((state) => state.isPlayerOpen)

    const articleLink = useArticleStore((state) => state.articleLink)
    const fetchedArticle = useArticleStore((state) => state.fetchedArticle)
    const isFetching = useArticleStore((state) => state.isFetching)
    const setIsFetching = useArticleStore((state) => state.setIsFetching)
    const setArticleStoreStringItem = useArticleStore((state) => state.setArticleStoreStringItem)

    const articleLinkRef = useRef() as MutableRefObject<HTMLDivElement>

    return (
        <div className="flex-grow min-h-0 flex flex-col animate__animated animate__fadeIn">
            <form>
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
                            onClick={() => setIsFetching(true)}
                            isDisabled={(articleLink === "") || isPlayerOpen}
                            toolTipText={isPlayerOpen ? `Close player to fetch` : (articleLink === "" ? `Please provide a link` : ``)}
                            toolTipPosition="bottom-right"
                        >
                            Fetch
                        </Button>
                    </div>
                </div>
            </form>
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
                <article className="flex-grow flex flex-col min-h-0 overflow-clip rounded-lg animate__animated animate__fadeIn">
                    {/* FETCHED ARTICLE TITLE */}
                    <div className="px-6 py-4 bg-primary-800/40 font-bold">
                        <a href={articleLink} target="_blank">
                            <p className="underline-none hover:underline hover:underline-offset-4">
                                {fetchedArticle.title}
                            </p>
                        </a>
                    </div>
                    {/* FETCHED ARTICLE TEXT */}
                    <div className="p-6 bg-primary-800/30 overflow-y-auto custom-scrollbar text-white/60">
                        <p>{fetchedArticle.article}</p>
                    </div>
                </article>}
        </div>
    )
}