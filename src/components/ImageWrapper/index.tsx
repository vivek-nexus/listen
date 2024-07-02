type ImageWrapperProps = {
    src: string,
    className?: string
}

export default function ImageWrapper({ src, className }: ImageWrapperProps) {
    return (
        <img src={`${process.env.NEXT_PUBLIC_LINK_PREFIX}/${src}`} className={className} />
    )
}