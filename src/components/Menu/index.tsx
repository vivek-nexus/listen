import { Dispatch, MutableRefObject, ReactNode, SetStateAction, useEffect, useRef } from "react";

type MenuProps = {
    className?: string,
    classNameWhenOpen: string,
    classNameWhenClosed: string,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    children: ReactNode
}

// Set Menu component's parent to relative positioning
// Pass className to override Menu CSS
export default function Menu({ className, classNameWhenOpen, classNameWhenClosed, isOpen, setIsOpen, children }: MenuProps) {
    // For detecting clicks outside the settings container
    const settingsRef = useRef() as MutableRefObject<HTMLDivElement>

    // TODO: If outside click is on dropdown, then the settings container does not close
    function detectOutsideClick(event: Event) {
        if (!settingsRef.current.contains(event.target as Node) && isOpen)
            setIsOpen(false)
    }

    useEffect(() => {
        document.addEventListener("click", detectOutsideClick)
        return () => document.removeEventListener("click", detectOutsideClick)
    }, [isOpen])


    return (
        <div
            ref={settingsRef}
            // overflow-clip to clip all content when height is zero. Removing elements distorts the animation. Hence, keeping elements but clipping the container.
            // Max height is animated for realistic visual transitions
            className={`absolute top-12 right-0 bg-black/40 rounded-md overflow-clip z-20 backdrop-blur shadow-menu-container-glow transition-all duration-500 justify-center ${className} ${isOpen ? classNameWhenOpen : classNameWhenClosed} `}
        >
            {children}
        </div>
    )
}