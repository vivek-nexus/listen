import Rectangle from "./Rectangle"
import styles from "./Phone.module.css"
import AnimatedSoundBars from "../AnimatedSoundBars"

type PhoneProps = {
    content: "reading" | "listening"
    children?: never
}
    |
{
    // children prop mandatory when content type is custom
    content: "custom"
    children: React.ReactNode
}

const RECTANGLES = 20

// Phone will stretch to 100% height and 100% width of the parent. Parent must have definite height and width.
export default function Phone({ content, children }: PhoneProps) {
    return (
        // PHONE BORDER
        <div className={`${styles.phone} relative h-full w-full p-2 rounded-2xl bg-black overflow-hidden`}>
            {/* PHONE BACKGROUND */}
            <div className={`${styles["phone-background"]} w-full h-full rounded-xl p-2 overflow-hidden`} >

                {/* PHONE CONTENTS: READING */}
                {content === "reading" &&
                    <>
                        <div className={`${styles["content-container-1"]}`}>
                            {[...Array(RECTANGLES)].map((item, index) => {
                                return (<Rectangle key={1 + index} />)
                            })}
                        </div>
                        {/* Duplicate rectangles to give the continuity effect. Hidden from screen readers to prevent confusion. */}
                        <div aria-hidden="true" className={`${styles["content-container-2"]}`}>
                            {[...Array(RECTANGLES)].map((item, index) => {
                                return (<Rectangle key={2 + index} />)
                            })}
                        </div>
                    </>
                }

                {/* PHONE CONTENTS: LISTENING */}
                {content === "listening" &&
                    <div className="w-full h-full flex items-center justify-center">
                        {/* Setting height and width of sound bars container, for them to fill */}
                        <div className="w-[84px] h-[84px]">
                            <AnimatedSoundBars isPlaying={true} />
                        </div>
                    </div>
                }

                {/* PHONE CONTENTS: CUSTOM */}
                {content === "custom" &&
                    <>
                        {children}
                    </>
                }
            </div>

            {/* PHONE NAVIGATION INDICATOR */}
            <div className="bg-white/70 h-1 rounded-full w-1/3 absolute mx-auto left-0 right-0 bottom-2"></div>
        </div>
    )
}