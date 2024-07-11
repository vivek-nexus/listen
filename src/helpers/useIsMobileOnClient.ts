import { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'

// If you consume the return value inside useEffect, make sure to add it in the dependency array. This is because this hook can update value only after calling component mounts.
export function useIsMobileOnClient() {
    const [isMobileOnClient, setIsMobileOnClient] = useState(false)

    useEffect(() => {
        setIsMobileOnClient(isMobile)
    }, [isMobile])

    return isMobileOnClient
}