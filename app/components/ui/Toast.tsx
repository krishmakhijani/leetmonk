'use client'

import * as Toast from '@radix-ui/react-toast'
import { CheckCircledIcon, CrossCircledIcon, Cross2Icon } from '@radix-ui/react-icons'
import React from 'react'

interface ToastProps {
    message: string
    type: 'success' | 'error'
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ToastNotification({
    message,
    type,
    open,
    onOpenChange
}: ToastProps) {
    return (
        <Toast.Provider
            swipeDirection="right"
            duration={5000}
        >
            <Toast.Root
                className={`
                    fixed
                    top-4
                    right-4
                    w-full
                    max-w-xs
                    p-4
                    rounded-lg
                    shadow-lg
                    z-50
                    transform
                    transition-all
                    duration-300
                    ease-in-out
                    ${open
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                    }
                    ${type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }
                    sm:max-w-md
                    md:max-w-lg
                    lg:max-w-xl
                `}
                open={open}
                onOpenChange={onOpenChange}
            >
                <div className="flex items-center space-x-3">
                    {/* Icon */}
                    <div>
                        {type === 'success' ? (
                            <CheckCircledIcon
                                className="w-6 h-6 text-green-500"
                            />
                        ) : (
                            <CrossCircledIcon
                                className="w-6 h-6 text-red-500"
                            />
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        <Toast.Title className="font-semibold text-sm mb-1">
                            {type === 'success' ? 'Success' : 'Error'}
                        </Toast.Title>
                        <Toast.Description className="text-xs">
                            {message}
                        </Toast.Description>
                    </div>

                    {/* Close Button */}
                    <Toast.Close
                        className="
                            text-current
                            hover:opacity-70
                            focus:outline-none
                            focus:ring-2
                            focus:ring-offset-2
                            focus:ring-blue-500
                            rounded-full
                        "
                    >
                        <Cross2Icon className="w-4 h-4" />
                    </Toast.Close>
                </div>
            </Toast.Root>

            <Toast.Viewport
                className="
                    fixed
                    top-0
                    right-0
                    z-50
                    w-full
                    max-w-sm
                    m-4
                    flex
                    flex-col
                    gap-3
                    outline-none
                "
            />
        </Toast.Provider>
    )
}

// Optional: Custom Hook for Toast Management
export function useToast() {
    const [toast, setToast] = React.useState<{
        open: boolean,
        message: string,
        type: 'success' | 'error'
    }>({
        open: false,
        message: '',
        type: 'success'
    })

    const showToast = React.useCallback((
        message: string,
        type: 'success' | 'error' = 'success'
    ) => {
        setToast({
            open: true,
            message,
            type
        })
    }, [])

    const hideToast = React.useCallback(() => {
        setToast(prev => ({ ...prev, open: false }))
    }, [])

    return {
        toast,
        showToast,
        hideToast
    }
}
