import { LanguageCodeToLanguageMap } from "@/constants/languages";

export function getLanguageName(languageCode: string) {
    if (LanguageCodeToLanguageMap.hasOwnProperty(languageCode))
        // Assert that the  key is indeed present, since it is checked in the if statement above
        return LanguageCodeToLanguageMap[languageCode as keyof typeof LanguageCodeToLanguageMap]
    else
        return undefined
}