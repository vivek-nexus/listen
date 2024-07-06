import { usePwaStore } from "@/stores/usePwaStore";
import Button from "../Button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useArticleStore } from "@/stores/useArticleStore";
import { fireInstallPrompt } from "@/helpers/handlePwaLifeCycle/fireInstallPrompt";
import styles from "./Player.module.css"


export default function PlayerHeader() {
    const isPwaInstallable = usePwaStore((state) => state.isPwaInstallable)

    const fetchedArticle = useArticleStore((state) => state.fetchedArticle)
    const tab = useArticleStore((state) => state.tab)

    const setIsPlayerOpen = usePlayerStore((state) => state.setIsPlayerOpen)


    return (
        <div className="bg-primary-800/30 px-6 py-3 lg:mb-12 flex gap-2 items-center justify-between">
            {/* CLOSE ICON + ARTICLE TITLE */}
            <Button
                type="tertiary"
                // Max width necessary to give definite width, which is used in calc function of width-in-pixels class of p child tag
                className={`flex gap-2 items-center ${isPwaInstallable ? `max-w-[75%]` : `max-w-full`} overflow-x-clip`}
                toolTipText="Close player (esc)"
                toolTipPosition="bottom-left"
                onClick={() => setIsPlayerOpen(false)}
            >
                <span className="material-icons text-xl">close</span>
                {/* overflow-clip + text-nowrap + text-ellipsis needed to get the ... for long titles. Width in pixels needed for ellipsis to work, % widths won't work.*/}
                <p className={`text-white/70 font-bold overflow-clip text-nowrap text-ellipsis ${styles["width-in-pixels"]}`}>
                    {tab === "fetch" ? fetchedArticle.title : `Pasted article`}
                </p>
            </Button>

            {/* PWA ICON */}
            {isPwaInstallable &&
                <Button
                    type="tertiary"
                    className="flex gap-2 items-center"
                    toolTipText="Install Listen as an app"
                    toolTipPosition="bottom-right"
                    onClick={fireInstallPrompt}
                >
                    <span className="lg:hidden material-icons text-xl">install_mobile</span>
                    <span className="hidden lg:block material-icons text-2xl">install_desktop</span>
                </Button>
            }
        </div>
    )
}