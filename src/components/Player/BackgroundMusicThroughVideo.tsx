import { usePlayerStore } from "@/stores/usePlayerStore";
import { MutableRefObject, useEffect, useRef } from "react";

export default function BackgroundMusicThroughVideo() {
    const playerState = usePlayerStore((state) => state.playerState)
    const bgMusicVol = usePlayerStore((state) => state.bgMusicVol)
    const videoRef = useRef() as MutableRefObject<HTMLVideoElement>

    useEffect(() => {
        videoRef.current.volume = (bgMusicVol / (100))
        if ((playerState === "paused") || (playerState === "complete"))
            videoRef.current.pause()
        if (playerState === "playing")
            videoRef.current.play()
    }, [playerState, bgMusicVol])

    // TODO: Implement video play pause handling with ref forwarding
    useEffect(() => {
        videoRef.current.addEventListener("pause", handleVideoPlayPause)

        return (() => videoRef.current.removeEventListener("pause", handleVideoPlayPause))
    }, [])

    function handleVideoPlayPause() {
    }

    return (
        // Fixed position tiny invisible video
        <video ref={videoRef} loop className="fixed top-0 left-0 -z-50 h-2 w-1 pointer-events-none opacity-0">
            <source src={`${process.env.NEXT_PUBLIC_LINK_PREFIX}/the-beat-of-nature-122841.mp4`} type="video/mp4" />
            Your browser does not support video playback.
        </video>
    )
}