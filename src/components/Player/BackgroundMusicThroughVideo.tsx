import { useIsMobileOnClient } from "@/helpers/useIsMobileOnClient";
import { useIsTabletOnClient } from "@/helpers/useIsTabletOnClient";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { MutableRefObject, useEffect, useRef } from "react";

export default function BackgroundMusicThroughVideo() {
    const playerState = usePlayerStore((state) => state.playerState)
    const bgMusicVol = usePlayerStore((state) => state.bgMusicVol)
    const videoRef = useRef() as MutableRefObject<HTMLVideoElement>

    const isMobile = useIsMobileOnClient()
    const isTablet = useIsTabletOnClient()

    useEffect(() => {
        videoRef.current.volume = (bgMusicVol / ((isMobile || isTablet) ? 500 : 100))
        if ((playerState === "paused") || (playerState === "complete"))
            videoRef.current.pause()
        if (playerState === "playing")
            videoRef.current.play()
    }, [playerState, bgMusicVol])

    return (
        // Fixed position tiny invisible video
        <video ref={videoRef} loop className="fixed top-0 left-0 -z-50 h-2 w-1 pointer-events-none opacity-0">
            <source src={`${process.env.NEXT_PUBLIC_LINK_PREFIX}/the-beat-of-nature-122841.mp4`} type="video/mp4" />
            Your browser does not support video playback.
        </video>
    )
}