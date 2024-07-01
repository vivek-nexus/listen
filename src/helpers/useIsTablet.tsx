import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '@/constants'
import { useState, useEffect } from 'react'

export function useIsTablet() {
    const [isTablet, setIsTablet] = useState((window.innerWidth > MOBILE_BREAKPOINT) && (window.innerWidth <= TABLET_BREAKPOINT))

    useEffect(() => {
        const handleResize = () => setIsTablet((window.innerWidth > MOBILE_BREAKPOINT) && (window.innerWidth <= TABLET_BREAKPOINT))

        // Evaluate isTablet whenever window size changes
        window.addEventListener('resize', handleResize)

        // Cleanup function to remove the event listener when component unmounts
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return isTablet
}