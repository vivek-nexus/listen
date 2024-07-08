import { getSpeakingTimeText } from "@/helpers/getSpeakingTimeText";
import { fireInstallPrompt } from "@/helpers/handlePwaLifeCycle/fireInstallPrompt";
import { useArticleStore } from "@/stores/useArticleStore";
import { useGenericStore } from "@/stores/useGenericStore";
import { usePwaStore } from "@/stores/usePwaStore";
import Button from "../Button";


export default function PlayerHeader() {
    const isPwaInstallable = usePwaStore((state) => state.isPwaInstallable)

    const fetchedArticle = useArticleStore((state) => state.fetchedArticle)
    const articleToSpeak = useArticleStore((state) => state.articleToSpeak)
    const tab = useGenericStore((state) => state.tab)

    const setIsPlayerOpen = useGenericStore((state) => state.setIsPlayerOpen)


    return (
        <div className="bg-primary-800/30 px-6 py-3">
            <div className="flex gap-4 items-center">
                {/* CLOSE ICON + PLAYER TITLE */}
                <Button
                    type="tertiary"
                    className={`flex-grow flex gap-2 items-center`}
                    toolTipText="Close player (esc)"
                    toolTipPosition="bottom-left"
                    onClick={() => setIsPlayerOpen(false)}
                >
                    <span className="material-icons text-2xl">close</span>
                    <p className={`text-white/70 font-bold text-nowrap`}>
                        {tab === "fetch" ? `Fetched article` : `Pasted article`}
                    </p>
                    <p className="text-white/70">|</p>
                    <p className="text-white/70 text-sm">{getSpeakingTimeText(articleToSpeak)}</p>
                </Button>
                {/* PWA ICON */}
                {isPwaInstallable &&
                    <Button
                        type="tertiary"
                        toolTipText="Install Listen as an app"
                        toolTipPosition="bottom-right"
                        onClick={fireInstallPrompt}
                    >
                        <span className="lg:hidden material-icons text-2xl">install_mobile</span>
                        <span className="hidden lg:block material-icons text-2xl">install_desktop</span>
                    </Button>
                }
                {/* Help ICON */}
                <Button
                    type="tertiary"
                    toolTipText="Help"
                    toolTipPosition="bottom-right"
                >
                    <span className="material-icons text-2xl">help</span>
                </Button>
            </div>
        </div>
    )
}