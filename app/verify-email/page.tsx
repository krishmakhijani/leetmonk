'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function VerifyEmailContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const verifyToken = async () => {
            const token = searchParams.get('token')

            if (!token) {
                setStatus('error')
                setMessage('Invalid verification link')
                return
            }

            try {
                const res = await fetch(`/api/v1/auth/verify-email?token=${token}`)
                const data = await res.json()

                if (res.ok) {
                    setStatus('success')
                    setMessage(data.message)
                    setTimeout(() => {
                        router.push('/login')
                    }, 3000)
                } else {
                    setStatus('error')
                    setMessage(data.error)
                }
            } catch {
                setStatus('error')
                setMessage('Verification failed. Please try again.')
            }
        }

        verifyToken()
    }, [searchParams, router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-purple">
            <div className="max-w-md w-full p-6 bg-interactive-purple-dark rounded-lg shadow-lg">
                {status === 'loading' && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-text-purple-light mb-2">
                            Verifying your email...
                        </h2>
                    </div>
                )}

                {status === 'success' && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-solid-purple-light mb-2">
                            Email Verified!
                        </h2>
                        <p className="text-text-purple-light">
                            {message}
                        </p>
                        <p className="text-text-purple-light mt-4">
                            Redirecting to login...
                        </p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-500 mb-2">
                            Verification Failed
                        </h2>
                        <p className="text-text-purple-light">
                            {message}
                        </p>
                        <button
                            onClick={() => router.push('/login')}
                            className="mt-4 px-4 py-2 bg-solid-purple-light hover:bg-solid-purple-dark text-white rounded-md transition-colors"
                        >
                            Go to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function VerifyEmail() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    )
}
