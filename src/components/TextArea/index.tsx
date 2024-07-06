import { ChangeEvent } from "react"

type TextAreaProps = {
    className?: string,
    placeholder?: string,
    defaultValue?: string,
    value?: string,
    isDisabled?: boolean,
    toolTipText?: string,
    toolTipPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextArea({ className, placeholder, defaultValue, value, isDisabled, toolTipText, toolTipPosition, onChange }: TextAreaProps) {
    return (
        // Uses data-tool-tip HTML attribute to specify tool tip text. Tool tip shown as :after element.
        // Defaults tool tip position to bottom-left, if not provided
        // Wraps a div around text-area, since text-area does not have :after element to show tool tip
        <div
            className={toolTipText ? `tool-tip tool-tip-${toolTipPosition ? toolTipPosition : `bottom-left`}` : ``}
            data-tool-tip={toolTipText}
        >
            <textarea
                rows={10}
                className={`border p-4 w-full rounded-lg border-primary-800/50 outline-none duration-200 bg-primary-800/20 focus:border-primary-800 placeholder:text-white/40 custom-scrollbar disabled:bg-gray-500/30 disabled:cursor-not-allowed ${className}`}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                disabled={isDisabled}

                onChange={onChange}
            />

        </div>
    )
}