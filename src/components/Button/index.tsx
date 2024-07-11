import { useIsMobileOnClient } from "@/helpers/useIsMobileOnClient";
import { useIsTabletOnClient } from "@/helpers/useIsTabletOnClient";

type ButtonType = "primary" | "secondary" | "tertiary";

type ButtonProps = {
    type: ButtonType,
    children?: React.ReactNode,
    className?: string,
    isDisabled?: boolean,
    toolTipText?: string,
    toolTipPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
    onClick?: () => void
}

export default function Button({ type, children, className, isDisabled, toolTipText, toolTipPosition, onClick }: ButtonProps) {
    const isMobile = useIsMobileOnClient()
    const isTablet = useIsTabletOnClient()

    return (
        <button
            // Uses data-tool-tip HTML attribute to specify tool tip text. Tool tip shown as :after element.
            // Defaults tool tip position to bottom-left, if not provided
            // Disabled hover opacity is 100, in order to show tooltip at full opacity
            // Don't show tooltips on mobile buttons, since they stay after you tap, which is annoying
            className={`rounded-full transition-all duration-500 ${className} ${(toolTipText && !(isMobile || isTablet)) ? `tool-tip tool-tip-${toolTipPosition ? toolTipPosition : `bottom-left`}` : ``} ${getButtonType(type)} ${isDisabled ? `opacity-50 hover:opacity-100 cursor-not-allowed` : ``}`}
            data-tool-tip={!(isMobile || isTablet) ? toolTipText : ``}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

// Special treatment for secondary button, since semi transparent secondary button colour interferes with background pattern on home page
function getButtonType(type: ButtonType) {
    switch (type) {
        case "primary":
            return `bg-primary-800 text-white/70`
        case "secondary":
            return `bg-secondary-button-special text-primary-800`
        default:
            return `bg-transparent text-primary-800`
    }
}