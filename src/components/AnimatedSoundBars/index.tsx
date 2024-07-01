import Bar from "./Bar"

type AnimatedSoundBarsProps = {
    isPlaying: boolean
}

export default function AnimatedSoundBars({ isPlaying }: AnimatedSoundBarsProps) {
    return (
        // // Height and width of bars container are 100% of the parent element's width. Further each bar's height and width are also dependent on bar container's width.
        <div className="flex items-center w-full h-full gap-[15%]"  >
            <Bar number={1} isPlaying={isPlaying} />
            <Bar number={2} isPlaying={isPlaying} />
            <Bar number={3} isPlaying={isPlaying} />
            <Bar number={4} isPlaying={isPlaying} />
            <Bar number={5} isPlaying={isPlaying} />
        </div>
    )
}