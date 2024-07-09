import { CORS_ERROR_MESSAGE } from "@/constants/appConstants"
import { FetchedArticle } from "@/stores/useArticleStore"
import { Readability } from "@mozilla/readability"

export function fetchArticle(link: string): Promise<FetchedArticle> {
    {
        const urlToFetch = shouldFetchViaProxyServer() ? `https://render-express-server-q222.onrender.com/fetch-html?url=${link}` : `${link}`

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
}

function shouldFetchViaProxyServer() {
    try {
        // loaded as an iframe
        if (window.self !== window.top) {
            // loaded as same origin iframe. Should fetch via proxy.
            try {
                parent.document
                return true
            }
            // loaded as cross origin iframe. Should fetch from the link directly. Respective server must allow cross origin requests from https://vivek.nexus
            catch (e) {
                return false
            }
        }
        // loaded as an independent page. Should fetch via proxy.
        else {
            return true
        }
    }
    catch (e) {
        console.log(e)
        console.log("Error determining iframe status")
        // default to direct fetch
        return false
    }
}