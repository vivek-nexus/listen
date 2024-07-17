import { DEFAULT_PASTED_ARTICLE } from "@/constants/appConstants"
import { create } from "zustand"

// Store items that use a common setter function
type ArticleStoreItemsOfTypeString = "articleLink" | "pastedArticle" | "articleToSpeak"
export type FetchedArticle = {
    title: string,
    article: string
}

interface ArticleStoreState {
    articleLink: string,
    pastedArticle: string,
    articleToSpeak: string,
    fetchedArticle: FetchedArticle,
    setFetchedArticle: (item: "title" | "article", newValue: string) => void,
    languageCodeOfArticleToSpeak: string,
    setArticleLanguageCode: (newValue: string) => void,
    isFetching: boolean,
    setIsFetching: (newValue: boolean) => void,
    sentences: string[],
    setSentences: (newValue: string[]) => void,
    setArticleStoreStringItem: (item: ArticleStoreItemsOfTypeString, newValue: string) => void
}

export const useArticleStore = create<ArticleStoreState>(
    (set) => ({
        articleLink: "",

        pastedArticle: DEFAULT_PASTED_ARTICLE,
        articleToSpeak: "",
        fetchedArticle: {
            title: "",
            article: ""
        },
        setFetchedArticle: (item, newValue) => set((state) => ({
            fetchedArticle: {
                ...state.fetchedArticle,
                [item]: newValue
            }
        })),
        languageCodeOfArticleToSpeak: "en",
        setArticleLanguageCode: (newValue) => set({ languageCodeOfArticleToSpeak: newValue }),
        isFetching: false,
        setIsFetching: (newValue) => set({ isFetching: newValue }),
        sentences: [],
        setSentences: (newValue: string[]) => set({ sentences: newValue }),
        setArticleStoreStringItem: (item, newValue) => set({ [item]: newValue }),
    }))