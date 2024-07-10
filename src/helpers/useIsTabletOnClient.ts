import { useState, useEffect } from 'react'
import { isTablet } from 'react-device-detect'

export function useIsTabletOnClient() {
    const [isTabletOnClient, setIsTabletOnClient] = useState(false)

    useEffect(() => {
        setIsTabletOnClient(isTablet)
    }, [isTablet])

    return isTabletOnClient
}