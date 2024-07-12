export function shouldCaptureAnalytics() {
    const searchParams = new URLSearchParams(window.location.search);
    const hasParam = searchParams.get("url")

    if (hasParam) {
        // Drop analytics 
        if (hasParam.includes("corrieredellacalabria.it"))
            return false
        else
            return true
    }
    else
        return true
}