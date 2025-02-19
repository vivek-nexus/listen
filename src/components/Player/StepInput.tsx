import { SpeechSettingDefaultValues } from "@/constants/appConstants"
import { Item, usePlayerStore } from "@/stores/usePlayerStore"
import Button from "../Button"

type StepInputProps = {
    label: string,
    item: Item,
    min: number,
    max: number,
    step: number,
    value: number,
}

export default function StepInput({ label, item, min, max, step, value }: StepInputProps) {
    const incrementStepValue = usePlayerStore((state) => state.incrementStepValue)
    const decrementStepValue = usePlayerStore((state) => state.decrementStepValue)
    const setStepValue = usePlayerStore((state) => state.setStepValue)


    return (
        <div className="w-full">
            <div className="flex gap-4 items-center justify-between mb-1">
                <p className=" text-primary-800">{label}</p>
                <Button
                    type="tertiary"
                    className={`flex items-center`}
                    onClick={() => setStepValue(item, SpeechSettingDefaultValues[item])}
                >
                    <span className="material-icons text-primary-800">settings_backup_restore</span>
                </Button>
            </div>

            {/* TICKER CONTAINER */}
            <div className="bg-primary-800/20 p-1 rounded flex gap-4 items-center justify-between">
                {/* DECREASE */}
                <Button
                    type="tertiary"
                    className={`flex items-center`}
                    // min+step, to prevent going into negative values
                    isDisabled={value < (min + step)}
                    onClick={() => {
                        if (value > (min)) {
                            decrementStepValue(item, step)
                        }
                    }}
                >
                    <span className="material-icons text-primary-800">remove</span>
                </Button>

                {/* VALUE */}
                {/* For rate and pitch, stored values range from 0 to 20. Hence divide by 10 and round to one decimal. */}
                {/* Minimum width to prevent layout shift at different decimal places */}
                <p
                    key={value}
                    className="font-bold min-w-6 animate__animated animate__bounceIn"
                >
                    {((item === "rate") || (item === "pitch")) ? (value / 10).toFixed(1) : value}
                </p>

                {/* INCREASE */}
                <Button
                    type="tertiary"
                    className={`flex items-center`}
                    isDisabled={value >= (max)}
                    onClick={() => {
                        if (value < (max)) {
                            incrementStepValue(item, step)
                        }
                    }}
                >
                    <span className="material-icons  text-primary-800">add</span>
                </Button>
            </div>
        </div>
    )
}