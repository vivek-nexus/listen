// https://stackoverflow.com/a/37493957
export function getSpeakingTimeText(text: string) {
    // Get number of words
    const words = text.match(/[^\s]+/g)
    if (words) {
        const minTime = (Math.floor(words.length / 150))
        const maxTime = Math.floor(words.length / 110)
        if (minTime > 1) {
            if (minTime === maxTime)
                return `~${maxTime} min`
            else
                return `${minTime} - ${maxTime} min`
        }
        else
            return `<1 min`
    }
    else
        return `<1 min`
}