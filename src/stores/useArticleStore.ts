import { DEFAULT_PASTED_ARTICLE } from "@/constants/appConstants"
import { LanguageCode } from "cld3-asm"
import { create } from "zustand"

// Store items that use a common setter function
type ArticleStoreItemsOfTypeString = "articleLink" | "pastedArticle" | "articleToSpeak"
export type FetchedArticle = {
    title: string,
    article: string
}

interface ArticleStoreState {
    articleLink: string,
    fetchedArticle: FetchedArticle,
    pastedArticle: string,
    articleToSpeak: string,
    languageCodeOfArticleToSpeak: LanguageCode,
    setArticleStoreStringItem: (item: ArticleStoreItemsOfTypeString, newValue: string) => void
    setFetchedArticle: (item: "title" | "article", newValue: string) => void,
    setArticleLanguageCode: (newValue: LanguageCode) => void
}

export const useArticleStore = create<ArticleStoreState>((set) => ({
    articleLink: "",
    fetchedArticle: {
        title: "",
        article: ""
    },
    pastedArticle: DEFAULT_PASTED_ARTICLE,
    articleToSpeak: "",
    languageCodeOfArticleToSpeak: LanguageCode.EN,
    setArticleStoreStringItem: (item, newValue) => set({ [item]: newValue }),
    setFetchedArticle: (item, newValue) => set((state) => ({
        fetchedArticle: {
            ...state.fetchedArticle,
            [item]: newValue
        }
    })),
    setArticleLanguageCode: (newValue) => set({ languageCodeOfArticleToSpeak: newValue })
}))