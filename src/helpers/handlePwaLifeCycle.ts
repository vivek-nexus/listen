import { useEffect, useState } from "react"

// beforeinstallprompt is non standard web API. Hence skipping type, since there isn't much value. https://stackoverflow.com/q/51503754
export let deferredPrompt: any

// Call this hook in the top most component, on page load
export function useIsPwaInstallable() {
    const [isPwaInstallable, setIsPwaInstallable] = useState(false)

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (event) => {
            console.log("Captured and saved reference to beforeinstallprompt ")
            deferredPrompt = event
            setIsPwaInstallable(true)
        })
    }, [])

    return isPwaInstallable
}

// Call this to show PWA install prompt at any point in time. Implement handling return values.
export function fireInstallPrompt() {
    if (deferredPrompt) {
        deferredPrompt.prompt()
        return true
    }
    else {
        console.log(`To install this app, find and click the "Add to home screen" or "Install app" option in your browser`)
        return false
    }
}

