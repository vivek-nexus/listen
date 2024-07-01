import styles from "./AnimatedSoundBars.module.css"

type BarProps = {
    number: 1 | 2 | 3 | 4 | 5,
    isPlaying: boolean
}

// Height and width of bars are % of the parent element's width
export default function Bar({ number, isPlaying }: BarProps) {
    return (
        <div className={`bg-primary-800 rounded-full w-[7.5%] h-[7.5%] ${styles["bar"]} ${styles[`bar-${number}`]} ${isPlaying ? styles["animation-running"] : styles["animation-paused"]}`}></div>
    )
}