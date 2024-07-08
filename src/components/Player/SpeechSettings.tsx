import Button from "../Button";
import { VoicesDropdown } from "./VoicesDropdown";

export default function SpeechSettings() {


    return (
        <>
            <div className="mb-4 flex gap-2 items-center">
                <div className="flex-grow">
                    <VoicesDropdown />
                </div>
                <div>
                    <Button
                        type="tertiary"
                        className={`flex-grow flex gap-2 items-center`}
                        toolTipText="Speech settings"
                        toolTipPosition="bottom-right"
                    // onClick={() => setIsPlayerOpen(false)}
                    >
                        <span className="material-icons text-4xl text-primary-800">tune</span>
                    </Button>
                </div>
            </div>
            <p className="lg:hidden text-primary-800 text-center text-sm">On mobile devices, change voice in your device text to speech settings</p>
            <p className="hidden lg:block text-primary-800 text-center text-sm">On desktop devices, use Google Chrome for more natural voices</p>
        </>
    )
}
