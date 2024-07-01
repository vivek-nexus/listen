import { MOBILE_BREAKPOINT } from '@/constants'
import { useState, useEffect } from 'react'

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)

        // Evaluate isMobile whenever window size changes
        window.addEventListener('resize', handleResize)

        // Cleanup function to remove the event listener when component unmounts
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return isMobile
}