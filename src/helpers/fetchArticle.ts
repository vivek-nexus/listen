import { CORS_ERROR_MESSAGE, PROXY_SERVER_URL } from "@/constants/appConstants"
import { FetchedArticle } from "@/stores/useArticleStore"
import { Readability } from "@mozilla/readability"
import { getIframeStatus } from "./getIframeStatus"

export function fetchArticle(link: string): Promise<FetchedArticle> {
    const iframeStatus = getIframeStatus()
    const shouldFetchViaProxyServer = ((iframeStatus === "same-origin-iframe") || (iframeStatus === "standalone-page")) ? true : false
    // For cross origin iframes, respective server must allow cross origin requests from https://listen.viveknexus.com
    // const urlToFetch = shouldFetchViaProxyServer ? `${PROXY_SERVER_URL}/fetch-html?url=${link}` : `${link}`
    const urlToFetch = shouldFetchViaProxyServer ? `${PROXY_SERVER_URL}/fetch-html?url=${link}` : `${link}`

    // Return the fetch promise
    return fetch(urlToFetch)
        .then((response) => {
            // Check if response is not okay
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            // Return the text promise
            return response.text()
        })
        .then((result) => {
            // Parse the HTML
            const parser = new DOMParser()
            const html = parser.parseFromString(result, "text/html")
            const parsedArticleFromHTML = new Readability(html).parse()

            if (parsedArticleFromHTML) {
                // Return the article object
                return {
                    title: parsedArticleFromHTML.title,
                    article: parsedArticleFromHTML.textContent
                }
            } else {
                console.log(`No article content found for ${link}`)
                return {
                    title: "",
                    article: ""
                }
            }
        })
        .catch((error) => {
            console.error(error)
            console.error(CORS_ERROR_MESSAGE)
            return {
                title: "",
                article: ""
            }
        })
}