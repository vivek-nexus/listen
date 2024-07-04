import { Dispatch, SetStateAction, useEffect, useState } from "react"

type ToastProps = {
    keyToCleanUp?: any,
    showToast: boolean,
    setShowToast: Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode
}

// Shows toast message for 5 seconds . Cleans up any previous toast pending timeout if a key is provided, so that the new toast always has 5 seconds timeout.
export default function Toast({ keyToCleanUp, showToast, setShowToast, children }: ToastProps) {
    useEffect(() => {
        if (showToast) {
            const toastTimeOut = setTimeout(() => {
                setShowToast(false)
            }, 5000)

            // Clear toast and the timeout, if keyToCleanUp or showToast changes
            return () => {
                clearTimeout(toastTimeOut)
                setShowToast(false)
            }
        }
    }, [showToast, keyToCleanUp])

    return (
        <>
            {/* showToast is needed to remove the toast, after the timeout elapses */}
            {showToast &&
                <div
                    key={keyToCleanUp}
                    className={`absolute w-full left-0 bg-primary-900 p-1 animate__animated bottom-0 animate__fadeInUp`}
                >
                    {children}
                </div>}
        </>
    )
}