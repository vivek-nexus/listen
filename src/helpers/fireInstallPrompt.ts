import { deferredPrompt } from "@/hooks/useIsPwaInstallable"

// Call this helper function to show PWA install prompt. useIsPwaInstallable hook must have been used for this helper function to work.
export function fireInstallPrompt() {
    if (deferredPrompt) {
        deferredPrompt.prompt()
        return true
    }
    else {
        console.error(`Could not show PWA prompt. PWA might have been already installed / browser may not support PWA / might be an incognito tab.`)
        return false
    }
}