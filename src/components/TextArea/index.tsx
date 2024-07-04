import { ChangeEvent } from "react"

type TextAreaProps = {
    className?: string,
    placeholder?: string,
    defaultValue?: string,
    value?: string,
    isDisabled?: boolean,
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextArea({ className, placeholder, defaultValue, value, isDisabled, onChange }: TextAreaProps) {
    return (
        <textarea
            rows={10}
            className={`border p-4 w-full rounded-lg border-primary-800/50 outline-none duration-200 bg-primary-800/20 focus:border-primary-800 placeholder:text-white/40 custom-scrollbar disabled:bg-gray-500/30 disabled:cursor-not-allowed ${className}`}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            disabled={isDisabled}
            // title={isDisabled ? disabledTitle : ``}
            onChange={onChange}
        />
    )
}