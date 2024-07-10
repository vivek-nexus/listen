import { getLanguageName } from '@/helpers/getLanguageName'
import { isLocalStorageSupported } from '@/helpers/isLocalStorageSupported'
import { useIsMobile } from '@/helpers/useIsMobile'
import { useIsTablet } from '@/helpers/useIsTablet'
import { useArticleStore } from '@/stores/useArticleStore'
import { useGenericStore } from '@/stores/useGenericStore'
import { Voice, usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect, useState } from 'react'
import Select, { CSSObjectWithLabel } from 'react-select'

export function VoicesDropdown() {
    const setShowToast = useGenericStore((state) => state.setShowToast)
    const setToastType = useGenericStore((state) => state.setToastType)

    const languageCodeOfArticleToSpeak = useArticleStore((state) => state.languageCodeOfArticleToSpeak)

    const voices = usePlayerStore((state) => state.voices)
    const voiceToSpeakWith = usePlayerStore((state) => state.voiceToSpeakWith)
    const setVoiceToSpeakWith = usePlayerStore((state) => state.setVoiceToSpeakWith)

    const [voicesOfAutoDetectedLanguage, setVoicesOfAutoDetectedLanguage] = useState<Array<Voice>>([])
    const [voicesOfOtherLanguages, setVoicesOfOtherLanguages] = useState<Array<Voice>>([])

    const isMobile = useIsMobile()
    const isTablet = useIsTablet()

    useEffect(() => {
        // Group voices for dropdown
        const tempVoicesOfAutoDetectedLanguage: Voice[] = []
        const tempVoicesOfOtherLanguages: Voice[] = []

        for (const voice of voices) {
            if (voice.lang === languageCodeOfArticleToSpeak)
                tempVoicesOfAutoDetectedLanguage.push(voice)
            else
                tempVoicesOfOtherLanguages.push(voice)
        }
        setVoicesOfAutoDetectedLanguage(tempVoicesOfAutoDetectedLanguage)
        setVoicesOfOtherLanguages(tempVoicesOfOtherLanguages)
    }, [languageCodeOfArticleToSpeak, voices])

    const optionsForDropdown = [
        {
            label: `${getLanguageName(languageCodeOfArticleToSpeak)} voices`,
            options: voicesOfAutoDetectedLanguage
        },
        {
            label: "Other language voices",
            options: voicesOfOtherLanguages
        }
    ]

    // Formatted group heading
    // TODO: Set the right type for data
    function formattedGroupLabel(data: { label: string, options: Voice[] }) {
        return (
            <div className="text-sm text-center">
                <span>{data.label}</span>
            </div>
        )
    }

    // Formatted option
    // TODO: Set the right type for data
    function formattedOption(data: Voice) {
        return (
            <div
                className="flex items-center justify-between"
                onClick={() => handleOptionClick(data)}
            >
                <span>{data.name}</span>
                {!data.localService &&
                    <span className="ml-2 px-3 py-1 text-xs bg-primary-800/30 text-white/70 rounded-full">NATURAL</span>
                }
            </div>
        )
    }

    function handleOptionClick(data: Voice) {
        for (const voice of voices) {
            if (voice.value === data.value) {
                setVoiceToSpeakWith(voice)
                setShowToast(true)
                setToastType("param-hot-reload")
            }
        }
        // Saving to localStorage only on click user event. Not considering programmatic voiceToSpeakWith changes, since they are guesses by the system and not user preferences to be saved. Guesses should freely change every time based on the influencing factors, whereas user preferences should be derived only from user actions.
        if (isLocalStorageSupported()) {
            // Save voice name as the preferred voice for this language
            window.localStorage.setItem(`${data.lang}`, data.name)
        }
    }


    return (
        <Select
            // TODO: Find a way to not bring up virtual keyboard on mobile, with isSearchable set to true
            isSearchable={(isMobile || isTablet) ? false : true}
            placeholder="Default voice"
            // TODO: Read from local storage
            value={voiceToSpeakWith}
            options={optionsForDropdown}
            classNamePrefix="voices-dropdown"
            formatGroupLabel={formattedGroupLabel}
            formatOptionLabel={formattedOption}
            noOptionsMessage={() => {
                return (
                    <span>No voices available on your device</span>
                )
            }}
            styles={{
                control: (base: CSSObjectWithLabel, state) => ({
                    ...base,
                    backgroundColor: "var(--primary-800-20)",
                    borderColor: `${state.isFocused ? "var(--primary-800)" : "var(--primary-800-50)"}`,
                    boxShadow: "none",
                    borderRadius: "32px",
                    padding: "0px 2px",
                    ":hover": {
                        borderColor: "var(--primary-800)",
                    },
                    ":active": {
                        borderColor: "var(--primary-800)",
                    },
                    cursor: "pointer",
                }),
                input: (base) => ({
                    ...base,
                    color: "var(--white-70)",
                }),
                singleValue: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: "var(--white-70)",
                }),
                dropdownIndicator: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: "var(--primary-800)",
                }),
                indicatorSeparator: (base: CSSObjectWithLabel) => ({
                    ...base,
                    backgroundColor: "var(--primary-800)",
                }),
                container: (base: CSSObjectWithLabel) => ({
                    ...base,
                    backgroundColor: "transparent",
                }),
                menuList: (base: CSSObjectWithLabel) => ({
                    ...base,
                    padding: "0px",
                }),
                menu: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: "var(--primary-800)",
                    overflow: "clip",
                    backgroundColor: `var(--black-40)`,
                    borderRadius: "8px",
                    border: "2px var(--primary-800-50) solid",
                    backdropFilter: "blur(8px)",
                    boxShadow: "var(--shadow-menu-container-glow)",
                    padding: "0px",
                    maxHeight: "300px",
                    transition: "all 0.5s linear",
                }),
                group: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: "var(--primary-800)",
                    padding: "0px",
                    marginBottom: "16px",
                }),
                groupHeading: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: "var(--white-70)",
                    padding: "8px",
                    backgroundColor: "var(--group-heading-bg)",
                    border: "none",
                    borderWidth: "2px 0px",
                    position: "sticky",
                    top: "0px",
                }),
                // Not able to understand what is the right type for state. Setting it to OptionProps<any, false, any> doesn't work. 
                option: (base: CSSObjectWithLabel, state: any) => ({
                    ...base,
                    transition: "color 0.2s",
                    color: state.isSelected ? "var(--white-70)" : "var(--primary-800)",
                    backgroundColor: state.isSelected && "var(--primary-800-80)",
                    ":hover": {
                        color: "var(--white-70)",
                    },
                    ":active": {
                        backgroundColor: "var(--primary-800-60)",
                    },
                    ":focus": {
                        backgroundColor: "var(--primary-800-40)",
                    },
                    cursor: "pointer"
                }),

            }}
        />
    )
}