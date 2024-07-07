import { VoicesDropdown } from "./VoicesDropdown";

export default function SpeechSettings() {


    return (
        <>
            <div className="mb-4">
                <VoicesDropdown />
            </div>
            <p className="lg:hidden text-primary-800 text-center text-sm">On mobile devices, change voice in your device text to speech settings</p>
            <p className="hidden lg:block text-primary-800 text-center text-sm">On desktop devices, use Google Chrome for more natural voices</p>
        </>
    )
}
