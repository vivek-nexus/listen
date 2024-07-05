import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '@/constants/appConstants'
import { useState, useEffect } from 'react'

export function useIsTablet() {
    const [isTablet, setIsTablet] = useState(false)


    useEffect(() => {
        // Evaluate as soon as the component mounts
        setIsTablet((window.innerWidth > MOBILE_BREAKPOINT) && (window.innerWidth <= TABLET_BREAKPOINT))

        const handleResize = () => setIsTablet((window.innerWidth > MOBILE_BREAKPOINT) && (window.innerWidth <= TABLET_BREAKPOINT))

        // Evaluate isTablet whenever window size changes
        window.addEventListener('resize', handleResize)

        // Cleanup function to remove the event listener when component unmounts
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return isTablet
}