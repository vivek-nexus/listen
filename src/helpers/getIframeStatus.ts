export function getIframeStatus() {
    try {
        // loaded as an iframe
        if (window.self !== window.top) {
            try {
                parent.document
                return "same-origin-iframe"
            }
            catch (e) {
                return "cross-origin-iframe"
            }
        }
        // loaded as an standalone page
        else {
            return "standalone-page"
        }
    }
    catch (e) {
        console.log(e)
        console.log("Error determining iframe status")
        return "unknown-status"
    }
}