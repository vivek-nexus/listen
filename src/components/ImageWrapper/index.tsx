type ImageWrapperProps = {
    src: string,
    className?: string
}

// SSR warning to think about:
// Warning: Prop `src` did not match. Server: "/github.svg" Client: "undefined/github.svg"

export default function ImageWrapper({ src, className }: ImageWrapperProps) {
    return (
        <img src={`${process.env.NEXT_PUBLIC_LINK_PREFIX}/${src}`} className={className} />
    )
}