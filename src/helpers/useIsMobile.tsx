import { MOBILE_BREAKPOINT } from '@/constant'
import { useState, useEffect } from 'react'

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)

        window.addEventListener('resize', handleResize)

        // Cleanup function to remove the event listener when component unmounts
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return isMobile
}