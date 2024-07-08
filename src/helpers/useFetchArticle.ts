import { useArticleStore } from "@/stores/useArticleStore"
import { useGenericStore } from "@/stores/useGenericStore"
import { useEffect } from "react"
import { fetchArticle } from "./fetchArticle"

// Fetches article whenever isFetching is set to true. Register the hook before parsing URL params for automatic fetching of passed URL.
export function useFetchArticle() {
    const setShowToast = useGenericStore((state) => state.setShowToast)
    const setToastType = useGenericStore((state) => state.setToastType)
    const isPlayerOpen = useGenericStore((state) => state.isPlayerOpen)

    const articleLink = useArticleStore((state) => state.articleLink)
    const setFetchedArticle = useArticleStore((state) => state.setFetchedArticle)
    const isFetching = useArticleStore((state) => state.isFetching)
    const setIsFetching = useArticleStore((state) => state.setIsFetching)


    // Fetch only if there is non empty link. Also prevent fetches when player is open.
    useEffect(() => {
        if ((articleLink !== "") && (!isPlayerOpen) && isFetching) {
            setFetchedArticle("title", "")
            setFetchedArticle("article", "")
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
    }, [isFetching])
}