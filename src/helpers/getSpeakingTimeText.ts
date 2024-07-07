// https://stackoverflow.com/a/37493957
export function getSpeakingTimeText(text: string) {
    const words = text.match(/[^\s]+/g)
    if (words && (Math.floor(words.length / 150) > 1)) {
        return `${Math.floor(words.length / 150)} - ${Math.floor(words.length / 110)} min`
    }
    else {
        return `<1 min`
    }
}