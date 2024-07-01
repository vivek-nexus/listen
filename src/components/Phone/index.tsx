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

const rectangles = 20

export default function Phone({ content, children }: PhoneProps) {
    return (
        // Phone border
        <div className={`${styles.phone} relative h-full w-full p-2 rounded-2xl bg-black overflow-hidden`}>
            {/* Phone background */}
            <div className={`${styles["phone-background"]} w-full h-full rounded-xl p-2 overflow-hidden`} >

                {/* Phone contents: reading */}
                {content === "reading" &&
                    <>
                        <div className={`${styles["content-container-1"]}`}>
                            {[...Array(rectangles)].map(() => {
                                return (<Rectangle />)
                            })}
                        </div>
                        {/* Duplicate rectangles to give the continuity effect. Hidden from screen readers to prevent confusion. */}
                        <div aria-hidden="true" className={`${styles["content-container-2"]}`}>
                            {[...Array(rectangles)].map(() => {
                                return (<Rectangle />)
                            })}
                        </div>
                    </>
                }

                {/* Phone contents: listening */}
                {content === "listening" &&
                    <div className="w-full h-full flex items-center justify-center">
                        {/* Setting height and width of sound bars container, for them to fill */}
                        <div className="w-[84px] h-[84px]">
                            <AnimatedSoundBars isPlaying={true} />
                        </div>
                    </div>
                }

                {/* Phone contents: custom */}
                {content === "custom" &&
                    <>
                        {children}
                    </>
                }
            </div>

            {/* Phone navigation indicator */}
            <div className="bg-white/70 h-1 rounded-full w-1/3 absolute mx-auto left-0 right-0 bottom-2"></div>
        </div>
    )
}