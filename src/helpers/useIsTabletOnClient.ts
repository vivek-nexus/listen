import { useState, useEffect } from 'react'
import { isTablet } from 'react-device-detect'

// If you consume the return value inside useEffect, make sure to add it in the dependency array. This is because this hook can update value only after calling component mounts.
export function useIsTabletOnClient() {
    const [isTabletOnClient, setIsTabletOnClient] = useState(false)

    useEffect(() => {
        setIsTabletOnClient(isTablet)
    }, [isTablet])

    return isTabletOnClient
}