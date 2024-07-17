import { ChangeEvent } from "react"

type InputProps = {
    className?: string,
    placeholder?: string,
    defaultValue?: string,
    value?: string,
    isDisabled?: boolean,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ className, placeholder, defaultValue, value, isDisabled, onChange }: InputProps) {
    return (
        <input
            className={`border py-2 pl-4 pr-20 w-full rounded-full border-primary-800/50 outline-none duration-200 bg-primary-800/20  focus:border-primary-800 placeholder:text-white/40 disabled:bg-gray-500/30 disabled:cursor-not-allowed ${className}`}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            disabled={isDisabled}
            onChange={onChange}
        />
    )
}