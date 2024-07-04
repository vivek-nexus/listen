import { useEffect } from "react"
import { usePwaStore } from "../../stores/usePwaStore"

// beforeinstallprompt is non standard web API. Hence skipping type, since there isn't much value. https://stackoverflow.com/q/51503754
export let deferredPrompt: any

// Call this hook in the top most component, on page load
export function useIsPwaInstallable() {
    const setIsPwaInstallable = usePwaStore((state) => state.setIsPwaInstallable)

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (event) => {
            // Prevent the mini-infobar from appearing on mobile
            event.preventDefault()
            console.log("Captured and saved reference to beforeinstallprompt ")
            // Stash the event so it can be triggered later
            deferredPrompt = event
            // Update state to indicate PWA installable
            setIsPwaInstallable(true)
        })
    }, [])
}

