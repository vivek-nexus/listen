import { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'

export function useIsMobileOnClient() {
    const [isMobileOnClient, setIsMobileOnClient] = useState(false)

    useEffect(() => {
        setIsMobileOnClient(isMobile)
    }, [isMobile])

    return isMobileOnClient
}