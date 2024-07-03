"use client"

import { fireInstallPrompt } from "@/helpers/handlePwaLifeCycle/fireInstallPrompt"
import { usePwaStore } from "@/stores/usePwaStore"

export default function App() {
    const isPwaInstallable = usePwaStore((state) => state.isPwaInstallable)

    return (
        <div>
            {isPwaInstallable && <div onClick={fireInstallPrompt}><span className="material-icons">install_mobile</span></div>}
            {!isPwaInstallable && <div>PWA cannot be installed</div>}
        </div>
    )
}