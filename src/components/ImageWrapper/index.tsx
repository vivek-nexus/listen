type ImageWrapperProps = {
    src: string,
    className?: string,
    alt: string
}

// ImageWrapper component needed to selectively prefix URLs between development and production
// TODO: Fix warning: Prop `src` did not match. Server: "/github.svg" Client: "undefined/github.svg"

export default function ImageWrapper({ src, className, alt }: ImageWrapperProps) {
    return (
        // A blank env variable is getting evaluated to undefined, hence the check to replace it with empty string
        <img src={`${process.env.NEXT_PUBLIC_LINK_PREFIX ? process.env.NEXT_PUBLIC_LINK_PREFIX : ``}/${src}`} className={className} alt={alt} />
    )
}