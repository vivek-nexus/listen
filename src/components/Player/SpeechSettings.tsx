import { MutableRefObject, useEffect, useRef, useState } from "react";
import Button from "../Button";
import { VoicesDropdown } from "./VoicesDropdown";
import StepInput from "./StepInput";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { isLocalStorageSupported } from "@/helpers/isLocalStorageSupported";
import { useGenericStore } from "@/stores/useGenericStore";
import Menu from "../Menu";

export default function SpeechSettings() {
    const setShowToast = useGenericStore((state) => state.setShowToast)
    const setToastType = useGenericStore((state) => state.setToastType)

    const rate = usePlayerStore((state) => state.rate)
    const pitch = usePlayerStore((state) => state.pitch)
    const bgMusicVol = usePlayerStore((state) => state.bgMusicVol)

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)


    // Save values to localStorage
    // Ideally should have been present on the click handlers, since programmatic changes are probably not user preferences. In these values, values change only due to user clicks, so doesn't make a difference.
    useEffect(() => {
        if (isLocalStorageSupported()) {
            window.localStorage.setItem("rate", `${rate}`)
            window.localStorage.setItem("pitch", `${pitch}`)
            window.localStorage.setItem("bgMusicVol", `${bgMusicVol}`)
        }
    }, [rate, pitch, bgMusicVol])

    // TODO: Add hot reload toast when values change, but only on first render
    useEffect(() => {


        // Toast clean up done by the useEffect in index.tsx to prevent set and clean up conflicts within components (that are trying to show toasts) of Player
    }, [rate, pitch, bgMusicVol])

    return (
        <div>
            <div className="mb-4 flex gap-2 items-center">
                <div className="flex-grow">
                    <VoicesDropdown />
                </div>
                <div className="relative">
                    <Button
                        type="tertiary"
                        className={`flex-grow flex gap-2 items-center`}
                        onClick={() => setIsSettingsOpen(true)}
                    >
                        <span className="material-icons text-4xl text-primary-800">tune</span>
                    </Button>
                    <Menu
                        isOpen={isSettingsOpen}
                        setIsOpen={setIsSettingsOpen}
                        classNameWhenOpen="max-h-52 p-6"
                        classNameWhenClosed="max-h-0 p-0"
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
                            step={1}
                            value={bgMusicVol}
                        />
                    </Menu>
                </div>
            </div>

            <p className="lg:hidden text-center text-sm">On mobile devices, ensure selected voice is installed in your device text to speech settings</p>
            <p className="hidden lg:block text-center text-sm">On desktop devices, use Google Chrome for more natural voices</p>
        </div>
    )
}
