import { APP_APP_LINK, APP_HOME_LINK, GITHUB_INTEGRATE_ON_YOUR_BLOG_LINK, GITHUB_ISSUES_LINK, GITHUB_MORE_HELP_LINK } from "@/constants/appConstants";
import { getSpeakingTimeText } from "@/helpers/getSpeakingTimeText";
import { fireInstallPrompt } from "@/helpers/fireInstallPrompt";
import { useArticleStore } from "@/stores/useArticleStore";
import { useGenericStore } from "@/stores/useGenericStore";
import { usePwaStore } from "@/stores/usePwaStore";
import { useState } from "react";
import Button from "../Button";
import Menu from "../Menu";


export default function PlayerHeader() {
    const isMobileOrTablet = useGenericStore((state) => state.isMobileOrTablet)
    const tab = useGenericStore((state) => state.tab)
    const setIsPlayerOpen = useGenericStore((state) => state.setIsPlayerOpen)

    const isPwaInstallable = usePwaStore((state) => state.isPwaInstallable)

    const articleToSpeak = useArticleStore((state) => state.articleToSpeak)
    const articleLink = useArticleStore((state) => state.articleLink)

    const [isHelpOpen, setIsHelpOpen] = useState(false)


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
                    <p className={`text-white/70 font-bold`}>
                        {tab === "fetch" ? `Fetched article` : `Pasted article`}
                    </p>
                    <p className="text-white/70">|</p>
                    <p className="text-white/70 text-sm">{getSpeakingTimeText(articleToSpeak)}</p>
                </Button>
                {/* SHARE ICON */}
                {/* navigator.share is supported properly, only on mobile browsers*/}
                {isMobileOrTablet && <Button
                    type="tertiary"
                    toolTipText="Share Listen"
                    toolTipPosition="bottom-right"
                    onClick={() => {
                        try {
                            navigator.share({
                                title: "Listen",
                                text: "Listen, your world-class reading companion:",
                                url: tab === "fetch" ? `${APP_APP_LINK}?url=${articleLink}&utm_source=in-app-share` : `${APP_HOME_LINK}?utm_source=in-app-share`
                            })
                        }
                        catch (error) {
                            console.log(error)
                        }
                    }}
                >
                    <span className="material-icons text-2xl">share</span>
                </Button>}
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
                {/* HELP ICON */}
                <div className="relative">
                    <Button
                        type="tertiary"
                        onClick={() => setIsHelpOpen(!isHelpOpen)}
                    >
                        <span className="material-icons text-2xl">help</span>
                    </Button>
                    <Menu
                        isOpen={isHelpOpen}
                        setIsOpen={setIsHelpOpen}
                        className="overflow-y-scroll custom-scrollbar"
                        classNameWhenOpen="max-h-[22rem] p-6 w-[18rem]"
                        classNameWhenClosed="max-h-0 p-0 w-0"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-bold">How to install voice data?</h3>
                            <hr className="my-2 border-primary-800" />
                            <ul>
                                <li className="list-disc ml-4 mb-2">
                                    <p className="">On Android, open device settings. Search for &quot;text to speech&quot;. Click on settings for the preferred engine and install voice data.</p>
                                </li>
                                <li className="list-disc ml-4">
                                    <p className="">On iOS, open device settings. Search for &quot;voices&quot; or &quot;spoken content&quot;. Choose a language and download voice data.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                            <a href={GITHUB_ISSUES_LINK} target="_blank">
                                <Button type="tertiary" className="font-bold" >
                                    Report an issue
                                </Button>
                            </a>
                            <a href={GITHUB_MORE_HELP_LINK} target="_blank">
                                <Button type="tertiary" className="font-bold" >
                                    Get more help
                                </Button>
                            </a>
                            <a href={GITHUB_INTEGRATE_ON_YOUR_BLOG_LINK} target="_blank">
                                <Button type="tertiary" className="font-bold">
                                    Integrate Listen your blog
                                </Button>
                            </a>
                        </div>
                    </Menu>
                </div>
            </div>
        </div>
    )
}