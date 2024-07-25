import { MutableRefObject, useEffect, useRef, useState } from "react"
import styles from "./AnimatedEye.module.css"

type AnimatedEyeProps = { isLoading: boolean }

// Multiplying factors for pupil movement. Adjust based on eye ball size.
const PUPIL_X_ADJUSTMENT = 12
const PUPIL_Y_ADJUSTMENT = 32

// Renders an animated eye
export default function AnimatedEye({ isLoading }: AnimatedEyeProps) {
    const [isClosed, setIsClosed] = useState(false)
    const [angle, setAngle] = useState(0)
    // Ref needed to manipulate style.transform property of the pupil div directly
    // typecast to avoid pupil.current might be possibly null
    const pupil = useRef() as MutableRefObject<HTMLDivElement>

    //follow mouse when not loading
    useEffect(() => {
        // named function to remove callback during cleanup
        function handleMouseMove(event: MouseEvent) {
            if (pupil.current) {
                // Get the x and y coordinate difference between mouse pointer location and the pupil. More distance of the pointer will cause the pupil to move farther.
                const x = event.pageX - pupil.current.getBoundingClientRect().left
                const y = event.pageY - pupil.current.getBoundingClientRect().top

                // Calculate sin/cos to move the pupil, based on window width and height and multiply with a factor to get final pixels to move.  Different x and y multiplication factors to account for eye ball height being greater than width.
                const translateX = ((x / (window.innerWidth * 0.5)) * PUPIL_X_ADJUSTMENT)
                const translateY = ((y / (window.innerHeight * 0.5)) * PUPIL_Y_ADJUSTMENT)
                // Try catch since react gives warnings that the DOM element is null, when changing state isLoading from true to false. 
                try {
                    pupil.current.style.transform = `translate(${translateX}px, ${translateY}px)`
                }
                catch (error) {
                    console.log(error)
                }
            }
        }
        if (!isLoading) {
            document.addEventListener("mousemove", handleMouseMove, false)
        }
        return () => document.removeEventListener("mousemove", handleMouseMove)
    }, [isLoading])

    // spin when loading
    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (pupil.current && isLoading) {
            timeout = setTimeout(() => {
                // Calculate the x and y based on angle. Multiply with different factors for x and y, to account for eye ball height being greater than width.
                const translateX = (Math.cos(angle * (Math.PI / 180)) * PUPIL_X_ADJUSTMENT)
                const translateY = (Math.sin(angle * (Math.PI / 180)) * PUPIL_Y_ADJUSTMENT)
                // Just repeating the try catch from above, for extra safety
                try {
                    pupil.current.style.transform = `translate(${translateX}px, ${translateY}px)`
                } catch (error) {
                    console.log(error)
                }
                setAngle(angle + 10)
            }, 20)
        }

        return (() => clearTimeout(timeout))
    }, [angle, isLoading])

    // blink eye periodically
    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (isClosed) {
            timeout = setTimeout(() => {
                setIsClosed(false)
            }, 400)
        }
        else {
            timeout = setTimeout(() => {
                setIsClosed(true)
            }, 2500)
        }
        return (() => clearTimeout(timeout))
    }, [isClosed])

    return (
        // EYE BALL CONTAINER
        <div
            className={`relative bg-white/60 w-12 h-24 rounded-[50%] overflow-clip ${styles["eye-container"]}`}
        >
            {/* EYE BALL TOP HALF */}
            {/* Height 2/3 when closed, to create visual effect of closing completely */}
            <div
                className={`absolute top-0 w-full bg-[#808080] z-10 transition-all duration-300 ${isClosed ? `h-2/3` : `h-0`}`}
            >
            </div>
            {/* EYE BALL BOTTOM HALF */}
            {/* Height 2/3 when closed, to create visual effect of closing completely */}
            <div
                className={`absolute bottom-0 w-full bg-[#808080] z-10 transition-all duration-300 ${isClosed ? `h-2/3` : `h-0`}`}
            >
            </div>
            {/* PUPIL */}
            <div
                className={`absolute w-8 h-8 top-0 bottom-0 my-auto left-0 right-0 mx-auto bg-black/90 rounded-full`}
                ref={pupil}
            >
                {/* PUPIL REFLECTION */}
                <div className="w-2 h-2 bg-white/60 rounded-full ml-2 mt-2"></div>
            </div>
        </div>
    )
}


