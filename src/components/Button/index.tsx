type ButtonType = "primary" | "secondary" | "tertiary";

type ButtonProps = {
    type: ButtonType,
    children?: React.ReactNode,
    className?: string,
    isDisabled?: boolean,
    disabledTitle?: string,
    onClick?: () => void
}

export default function Button({ type, children, className, isDisabled, disabledTitle, onClick }: ButtonProps) {
    return (
        <button
            className={`rounded-full duration-500 ${className} ${ButtonTypeHelper(type)} ${isDisabled ? `opacity-50 cursor-not-allowed` : ``}`}
            title={isDisabled ? disabledTitle : ``}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

// Special treatment for secondary button, since semi transparent secondary button colour interferes with background pattern on home page
function ButtonTypeHelper(type: ButtonType) {
    switch (type) {
        case "primary":
            return `bg-primary-800 text-white/70`
        case "secondary":
            return `bg-secondary-button-special text-primary-800`
        default:
            return `bg-transparent text-primary-800`
    }
}