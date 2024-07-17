import { useGenericStore } from "@/stores/useGenericStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { MutableRefObject, useEffect, useRef } from "react";

export default function BackgroundMusicThroughVideo() {
    const isMobileOrTablet = useGenericStore((state) => state.isMobileOrTablet)

    const playerState = usePlayerStore((state) => state.playerState)
    const bgMusicVol = usePlayerStore((state) => state.bgMusicVol)

    const videoRef = useRef() as MutableRefObject<HTMLVideoElement>

    useEffect(() => {
        // On mobile devices, the video volume seems relatively loud by a factor of 10
        // TODO: To test and update based on real devices
        videoRef.current.volume = (bgMusicVol / ((isMobileOrTablet ? 1000 : 100)))
        if ((playerState === "paused") || (playerState === "complete")) {
            // To catch network errors or ref removed errors
            try {
                videoRef.current.pause()
            } catch (error) {
                console.log(error)
            }
        }

        if (playerState === "playing") {
            // To catch network errors
            try {
                videoRef.current.play()
            } catch (error) {
                console.log(error)
            }
        }

    }, [playerState, bgMusicVol])

    // TODO: Implement video play pause handling with ref forwarding
    // useEffect(() => {
    //     videoRef.current.addEventListener("pause", handleVideoPlayPause)

    //     return (() => {
    //         try {
    //             videoRef.current.removeEventListener("pause", handleVideoPlayPause)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     })
    // }, [])

    // function handleVideoPlayPause() {
    // }

    return (
        // Fixed position tiny invisible video
        // TODO: process.env.NEXT_PUBLIC_LINK_PREFIX evaluates to undefined in development. Need to figure out why (already tried a lot).
        <video ref={videoRef} loop className="fixed top-0 left-0 -z-50 h-2 w-1 pointer-events-none opacity-0">
            <source src={`${process.env.NEXT_PUBLIC_LINK_PREFIX}/the-beat-of-nature-122841.mp4`} type="video/mp4" />
            Your browser does not support video playback.
        </video>
    )
}