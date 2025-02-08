
'use client'

import * as Toast from '@radix-ui/react-toast'

interface ToastProps {
    message: string
    type: 'success' | 'error'
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ToastNotification({ message, type, open, onOpenChange }: ToastProps) {
    return (
        <Toast.Provider swipeDirection="right">
            <Toast.Root
                className={`
          fixed bottom-4 right-4 p-4 rounded-lg shadow-lg
          ${type === 'success'
                        ? 'bg-green-500/10 border border-green-500/50 text-green-500'
                        : 'bg-red-500/10 border border-red-500/50 text-red-500'
                    }
        `}
                open={open}
                onOpenChange={onOpenChange}
                duration={5000}
            >
                <Toast.Title className="font-medium mb-1">
                    {type === 'success' ? 'Success' : 'Error'}
                </Toast.Title>
                <Toast.Description className="text-sm">
                    {message}
                </Toast.Description>
                <Toast.Close className="absolute top-2 right-2 text-current hover:opacity-70">
                    ×
                </Toast.Close>
            </Toast.Root>
            <Toast.Viewport />
        </Toast.Provider>
    )
}
