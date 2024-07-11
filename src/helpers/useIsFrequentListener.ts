import { useEffect } from "react";
import { isLocalStorageSupported } from "./isLocalStorageSupported";
import { useGenericStore } from "@/stores/useGenericStore";
import { FREQUENT_LISTENER_THRESHOLD } from "@/constants/appConstants";

// custom hook that increments count on every mount
// Determine current frequent listener status and updates store variable
export function useIsFrequentListener() {
    const setIsFrequentListener = useGenericStore((state) => state.setIsFrequentListener)
    useEffect(() => {
        if (isLocalStorageSupported()) {
            const data = window.localStorage.getItem("listenCount")
            if (data) {
                const listenCount = parseInt(data)
                // Increment count for next time
                window.localStorage.setItem("listenCount", `${listenCount + 1}`)
                if ((listenCount > FREQUENT_LISTENER_THRESHOLD))
                    setIsFrequentListener(true)
            }
            else
                window.localStorage.setItem("listenCount", `1`)
        }
    }, [])
}