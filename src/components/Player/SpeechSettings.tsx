import { MutableRefObject, useEffect, useRef, useState } from "react";
import Button from "../Button";
import { VoicesDropdown } from "./VoicesDropdown";
import StepInput from "./StepInput";
import { usePlayerStore } from "@/stores/usePlayerStore";

export default function SpeechSettings() {
    const rate = usePlayerStore((state) => state.rate)
    const pitch = usePlayerStore((state) => state.pitch)
    const bgMusicVol = usePlayerStore((state) => state.bgMusicVol)

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const settingsRef = useRef() as MutableRefObject<HTMLDivElement>

    function detectOutsideClick(event: Event) {
        if (!settingsRef.current.contains(event.target as Node) && isSettingsOpen)
            setIsSettingsOpen(false)
    }

    useEffect(() => {
        document.addEventListener("click", detectOutsideClick)
        return () => document.removeEventListener("click", detectOutsideClick)
    }, [isSettingsOpen])

    return (
        <div className="relative">
            <div className="mb-4 flex gap-2 items-center">
                <div className="flex-grow">
                    <VoicesDropdown />
                </div>
                <div>
                    <Button
                        type="tertiary"
                        className={`flex-grow flex gap-2 items-center`}
                        onClick={() => setIsSettingsOpen(true)}
                    >
                        <span className="material-icons text-4xl text-primary-800">tune</span>
                    </Button>
                </div>
            </div>
            <div
                ref={settingsRef}
                // overflow-clip to clip all content when height is zero. Removing elements distorts the animation. Hence, keeping elements but clipping the container.
                // Max height is animated for realistic visual transitions
                className={`absolute top-12 right-0 bg-black/40 rounded-md overflow-clip z-20 backdrop-blur shadow-menu-container-glow transition-all duration-500 justify-center ${isSettingsOpen ? `max-h-52 p-6` : `max-h-0 p-0`} `}
            >
                <div className="mb-8 flex gap-8">
                    <StepInput
                        label="Rate"
                        item="rate"
                        min={0}
                        max={20}
                        step={1}
                        value={rate}
                    />
                    <StepInput
                        label="Pitch"
                        item="pitch"
                        min={0}
                        max={20}
                        step={1}
                        value={pitch}
                    />
                </div>
                <StepInput
                    label="Background music volume"
                    item="bgMusicVol"
                    min={0}
                    max={100}
                    step={5}
                    value={bgMusicVol}
                />
            </div>
            <p className="lg:hidden text-primary-800 text-center text-sm">On mobile devices, change voice in your device text to speech settings</p>
            <p className="hidden lg:block text-primary-800 text-center text-sm">On desktop devices, use Google Chrome for more natural voices</p>
        </div>
    )
}
