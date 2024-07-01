import styles from "./AnimatedSoundBars.module.css"
import Bar from "./Bar"

type AnimatedSoundBarsProps = {
    isPlaying: boolean
}

export default function AnimatedSoundBars({ isPlaying }: AnimatedSoundBarsProps) {
    return (
        <div className="flex items-center w-full h-full gap-[15%]"  >
            <Bar number={1} isPlaying={isPlaying} />
            <Bar number={2} isPlaying={isPlaying} />
            <Bar number={3} isPlaying={isPlaying} />
            <Bar number={4} isPlaying={isPlaying} />
            <Bar number={5} isPlaying={isPlaying} />
        </div>
    )
}