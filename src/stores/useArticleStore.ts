import { DEFAULT_PASTED_ARTICLE } from "@/constants"
import { LanguageCode } from "cld3-asm"
import { create } from "zustand"

// Store items that use a common setter function
type ArticleStoreItemsWithCommonSetter = "articleLink" | "pastedArticle" | "articleToSpeak"

interface ArticleStoreState {
    articleLink: string,
    fetchedArticle: {
        title: string,
        article: string
    },
    pastedArticle: string,
    articleToSpeak: string,
    languageCodeOfArticleToSpeak: LanguageCode,
    setArticleStoreItem: (item: ArticleStoreItemsWithCommonSetter, newValue: string) => void
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
    setArticleStoreItem: (item, newValue) => set({ [item]: newValue }),
    setFetchedArticle: (item, newValue) => set((state) => ({
        fetchedArticle: {
            ...state.fetchedArticle,
            [item]: newValue
        }
    })),
    setArticleLanguageCode: (newValue) => set({ languageCodeOfArticleToSpeak: newValue })
}))