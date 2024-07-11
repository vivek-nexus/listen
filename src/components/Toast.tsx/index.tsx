import { useEffect } from "react"
import { renderToString } from "react-dom/server"

type ToastProps = {
    showToast: boolean,
    setShowToast: (showToast: boolean) => void,
    children: React.ReactNode
}

// Shows toast message for 5 seconds. 

// Toast completes 5 seconds. setTimeout calls setShowToast(false). 1.1 Toast is removed from DOM since showToast is now false. 1.2 setShowToast(false) returns useEffect and clears timeout.
// 2. Toast has to be cancelled within 5 seconds, but no new toast needs to be fired. setShowToast(false) is called by the respective function. 1.1 and 1.2 happen.
// 3. Toast has to be cancelled within 5 seconds, but new toast needs to be fired. A new toast is that needs to override current toast is assumed to have different children (otherwise  it is the same toast, isn't it?). Change in children clears previous timeout and since showToast is still true, a new timeout is started. Stringified children is passed as key to toast, so that children of the new toast reanimate.

export default function Toast({ showToast, setShowToast, children }: ToastProps) {
    useEffect(() => {
        // TODO: Understand why component is re-rendered, when some random state variables in the store changes (some examples: articleLink, isPlayerOpen etc.)
        if (showToast) {
            const toastTimeOut = setTimeout(() => {
                setShowToast(false)
            }, 5000)

            // Clear the timeout
            return () => {
                clearTimeout(toastTimeOut)
            }
        }
        // showToast dependency to show toast whenever setShowToast(true) is called
        // children dependency to clear old toast timeout and start a new timeout, whenever children changes
    }, [showToast, children])

    return (
        <>
            {/* showToast is needed to remove the toast, after the timeout elapses */}
            {showToast &&
                <div
                    key={(renderToString(children))}
                    className={`absolute w-full bottom-0 bg-primary-900 p-1 animate__animated  animate__fadeInUp`}
                >
                    {children}
                </div>}
        </>
    )
}