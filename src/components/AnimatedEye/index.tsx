import { useEffect, useState } from "react"
import FollowMouse from "./followMouse"
import { AnimatedEyeProps, QuerySelectorType } from "./AnimatedEye.types"
import styles from "./AnimatedEye.module.css"

// Renders an animated eye. There can be exactly one left and one right eye, in the document.
// TODO: Remove dependency on querySelector and move to refs
export default function AnimatedEye({ eye, isLoading }: AnimatedEyeProps) {
    const [isClosed, setIsClosed] = useState(false)
    const [angle, setAngle] = useState(0)

    //follow mouse when not loading
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => { FollowMouse(event, eye) }
        if (!isLoading) {
            document.addEventListener("mousemove", handleMouseMove, false)
        }
        return () => document.removeEventListener("mousemove", handleMouseMove)
    }, [isLoading])

    // spin when loading
    useEffect(() => {
        const pupil: QuerySelectorType = document.querySelector(`#${eye}`)
        if (pupil && isLoading) {
            setTimeout(() => {
                const translateX = (Math.cos(angle * (Math.PI / 180)) * 0.5 * 24)
                const translateY = (Math.sin(angle * (Math.PI / 180)) * 0.5 * 64)
                pupil.style.transform = `translate(${translateX}px, ${translateY}px)`
                setAngle(angle + 10)
            }, 20)
        }
    }, [angle, isLoading])

    // blink eye periodically
    useEffect(() => {
        if (isClosed) {
            setTimeout(() => {
                setIsClosed(false)
            }, 400);
        }
        else {
            setTimeout(() => {
                setIsClosed(true)
            }, 2500);
        }
    }, [isClosed])

    return (
        // EYE BALL CONTAINER
        <div
            className={`relative bg-white/60 w-12 h-24 rounded-[50%] overflow-clip ${styles["eye-container"]}`}
        >
            {/* EYE BALL TOP HALF */}
            <div
                className={`absolute top-0 w-full bg-[#808080] z-10 transition-all duration-300 ${isClosed ? `h-2/3` : `h-0`}`}
            >
            </div>
            {/* EYE BALL BOTTOM HALF */}
            <div
                className={`absolute bottom-0 w-full bg-[#808080] z-10 transition-all duration-300 ${isClosed ? `h-2/3` : `h-0`}`}
            >
            </div>
            {/* PUPIL */}
            <div
                className={`absolute w-8 h-8 top-0 bottom-0 my-auto left-0 right-0 mx-auto bg-black/90 rounded-full`}
                id={eye}
            >
                {/* PUPIL REFLECTION */}
                <div className="w-2 h-2 bg-white/60 rounded-full ml-2 mt-2"></div>
            </div>
        </div>
    )
}


