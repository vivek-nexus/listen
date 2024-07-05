import AnimatedSoundBars from "../AnimatedSoundBars";
import Button from "../Button";

export default function PlayerControls() {
    return (
        <div className="relative">
            <div className="bg-primary-800/20 flex gap-4 justify-center items-center px-6 py-6">
                <Button
                    type="tertiary"
                    className="flex gap-2 items-center"
                // onClick={() => {
                //     pauseUtterance()
                //     setTimeout(() => {
                //         setCurrentSentence(currentSentence - 1)
                //     }, 100);
                // }}
                >
                    <span
                        className="material-icons text-4xl"
                    >
                        fast_rewind
                    </span>
                </Button>
                <Button
                    type="primary"
                    className="rounded-full w-min flex p-3"
                // onClick={() => {
                //     HandlePlayPauseButtonClick()
                // }}
                >
                    <span
                        className="material-icons text-6xl"
                    >
                        {true ? `play_arrow` : `pause`}
                    </span>
                </Button>
                <Button
                    type="tertiary"
                    className="flex gap-2 items-center"
                // onClick={() => {
                //     pauseUtterance()
                //     setTimeout(() => {
                //         setCurrentSentence(currentSentence + 1)
                //     }, 100);
                // }}
                >
                    <span
                        className="material-icons text-4xl"
                    >
                        fast_forward
                    </span>
                </Button>
            </div>
            <div className="absolute top-2/3 w-full flex justify-center gap-3 blur-[3px] opacity-70">
                <div className="w-1/4 aspect-square">
                    <AnimatedSoundBars isPlaying={true} />
                </div>
                <div className="w-1/4 aspect-square">
                    <AnimatedSoundBars isPlaying={true} />
                </div>
                <div className="w-1/4 aspect-square">
                    <AnimatedSoundBars isPlaying={true} />
                </div>
                <div className="w-1/4 aspect-square">
                    <AnimatedSoundBars isPlaying={true} />
                </div>
            </div>
        </div>
    )
}