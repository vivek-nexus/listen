import { useEffect } from "react"

type ToastProps = {
    stateVariablesToCleanUp?: any,
    showToast: boolean,
    setShowToast: (showToast: boolean) => void,
    children: React.ReactNode
}

// Shows toast message for 5 seconds . Cleans up any previous toast pending timeout if one or more state variables are provided, so that the new toast always has 5 seconds timeout.
export default function Toast({ stateVariablesToCleanUp, showToast, setShowToast, children }: ToastProps) {
    useEffect(() => {
        console.log("New render effect " + showToast)
        if (showToast) {
            const toastTimeOut = setTimeout(() => {
                setShowToast(false)
            }, 5000)

            // Clear the timeout, whenever stateVariablesToCleanUp changes
            return () => {
                console.log("Cleaning up previous toast " + showToast)
                clearTimeout(toastTimeOut)
            }
        }
    }, [stateVariablesToCleanUp])

    return (
        <>
            {/* showToast is needed to remove the toast, after the timeout elapses */}
            {showToast &&
                <div
                    // stateVariablesToCleanUp is passed as a key, to just retrigger the class based animation. Change in keys here does not trigger a render, but a render is still triggered because stateVariablesToCleanUp is passed as dependency array to useEffect.
                    key={stateVariablesToCleanUp}
                    className={`absolute w-full bg-primary-900 p-1 animate__animated bottom-0 animate__fadeInUp`}
                >
                    {children}
                </div>}
        </>
    )
}