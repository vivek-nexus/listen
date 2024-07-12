import { maxSentenceLength } from "@/constants/appConstants";
import { useArticleStore } from "@/stores/useArticleStore";
import { useEffect } from "react";
import { useGenericStore } from "@/stores/useGenericStore";

export function useSplitArticleToSentences() {
    const isMobileOrTablet = useGenericStore((state) => state.isMobileOrTablet)

    const articleToSpeak = useArticleStore((state) => state.articleToSpeak)
    const setSentences = useArticleStore((state) => state.setSentences)

    useEffect(() => {
        // Regular expression to split by sentence boundaries (handles multiple languages)
        // English: ., !, ?, ...
        // Hindi: ।
        // Chinese: 。, ！, ？, ……
        // Japanese: 。, ！, ？, ･･･
        // Arabic: ., ؟, !
        const sentenceSplitter = /([.|!|?|…|।|。|！|？]+[\])'"’”"]*\s+)/

        // Split the text into initial sentences. Contains sliced sentences and punctuation marks as items.
        // In the resultant array, sentence slices will be found at even indexes and punctuations at odd indexes.
        // If sentence starts with a punctuation mark, then the first item in the resultant array will be empty, followed by a punctuation mark.
        // The resultant array will always be odd numbered, since the last item will include the punctuation mark within the sentence slice (due to the regex, I didn't write it myself)
        const initialSentences = articleToSpeak.split(sentenceSplitter)

        // Array to store final sentences
        const sentencesArray: string[] = []

        // Loop picks up every alternate array item, since punctuations are present between two sentence slices.
        for (let i = 0; i < initialSentences.length; i += 2) {
            let currentSentence = initialSentences[i]

            // Pick up the punctuation mark from the next item and append to currentSentence
            // For the last item, there will be no punctuation following it. Hence, the check to avoid accessing an element that does not exist.
            if ((i + 1) < initialSentences.length)
                currentSentence += initialSentences[i + 1]

            // Trim leading and trailing whitespace
            currentSentence = currentSentence.trim()

            if (!isMobileOrTablet) {
                // Only on non mobile or non tablet devices, if the current sentence exceeds max length, further split while preserving words
                // Repeat until the current sentence is shorter than 250 characters
                while (currentSentence.length > maxSentenceLength) {
                    // Find the last space within the max length, starting from maxSentenceLength and moving towards the beginning
                    let lastSpaceIndex = currentSentence.lastIndexOf(' ', maxSentenceLength)

                    // If no space found, fallback to breaking the word boundary to split
                    if (lastSpaceIndex === -1) {
                        lastSpaceIndex = maxSentenceLength
                    }

                    // Extract the segment up to the last space
                    const segment = currentSentence.substring(0, lastSpaceIndex).trim()

                    // Push the sliced segment into sentences array
                    sentencesArray.push(segment)

                    // Remove the processed segment from the sentence for next loop iteration (if the remaining sentence is still greater than 250 characters)
                    currentSentence = currentSentence.substring(lastSpaceIndex).trim()
                }
            }

            // Push remaining or original sentence if within max length
            if (currentSentence.length > 0) {
                sentencesArray.push(currentSentence)
            }
        }

        setSentences(sentencesArray)

    }, [articleToSpeak])
}