import { useGenericStore } from '@/stores/useGenericStore'
import { useEffect } from 'react'
import { isMobile, isTablet } from 'react-device-detect'

// Call this custom hook on first page load
// If you consume the state variable, make sure to add it in the dependency array. This is because this hook can update value only after calling component mounts.
export function useIsMobileOrTabletOnClient() {
    const setIsMobileOrTablet = useGenericStore((state) => state.setIsMobileOrTablet)

    useEffect(() => {
        setIsMobileOrTablet((isMobile || isTablet))
    }, [isMobile, isTablet])
}