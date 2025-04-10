
'use client'

import * as Form from '@radix-ui/react-form'
import { EnvelopeClosedIcon, LockClosedIcon, EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import Link from 'next/link'
import { ToastNotification } from '../components/ui/Toast'
import { Footer } from '@/components/ui/Footer'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [toast, setToast] = useState<{
        open: boolean,
        message: string,
        type: 'success' | 'error'
    }>({
        open: false,
        message: '',
        type: 'success'
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            const res = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Login failed')
            }

            localStorage.setItem('token', data.token)
            setToast({
                open: true,
                message: 'Login successful, redirecting...',
                type: 'success'
            })

            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 1000)

        } catch (err) {
            setToast({
                open: true,
                message: (err as Error).message,
                type: 'error'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="min-h-screen bg-bg-purple flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-solid-purple-light mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-text-purple-light">
                            Sign in to your account
                        </p>
                    </div>

                    {/* Login Form */}
                    <Form.Root onSubmit={handleSubmit} className="space-y-6">
                        <Form.Field name="email">
                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium text-text-purple-light">
                                    Email
                                </Form.Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-purple-dark">
                                        <EnvelopeClosedIcon />
                                    </span>
                                    <Form.Control asChild>
                                        <input
                                            type="email"
                                            className="w-full bg-interactive-purple-dark border border-border-purple-dark rounded-lg px-9 py-2 text-text-purple-light placeholder:text-text-purple-dark focus:outline-none focus:border-border-purple-light"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </Form.Control>
                                </div>
                                <Form.Message className="text-red-500 text-sm" match="valueMissing">
                                    Please enter your email
                                </Form.Message>
                                <Form.Message className="text-red-500 text-sm" match="typeMismatch">
                                    Please enter a valid email
                                </Form.Message>
                            </div>
                        </Form.Field>

                        <Form.Field name="password">
                            <div className="space-y-2">
                                <Form.Label className="text-sm font-medium text-text-purple-light">
                                    Password
                                </Form.Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-purple-dark">
                                        <LockClosedIcon />
                                    </span>
                                    <Form.Control asChild>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="w-full bg-interactive-purple-dark border border-border-purple-dark rounded-lg px-9 py-2 text-text-purple-light placeholder:text-text-purple-dark focus:outline-none focus:border-border-purple-light pr-10"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </Form.Control>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-purple-dark hover:text-text-purple-light"
                                    >
                                        {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                                    </button>
                                </div>
                                <Form.Message className="text-red-500 text-sm" match="valueMissing">
                                    Please enter your password
                                </Form.Message>
                            </div>
                        </Form.Field>

                        <Form.Submit asChild>
                            <button
                                className="w-full bg-solid-purple-light hover:bg-solid-purple-dark text-white rounded-lg px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </Form.Submit>
                    </Form.Root>

                    {/* Sign Up Link */}
                    <p className="mt-6 text-center text-text-purple-light">
                        Dont have an account?{' '}
                        <Link
                            href="/signup"
                            className="text-solid-purple-light hover:text-solid-purple-dark"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>

                <ToastNotification
                    open={toast.open}
                    onOpenChange={(open) => setToast(prev => ({ ...prev, open }))}
                    message={toast.message}
                    type={toast.type}
                />

            </div>
            <div>

                <footer className="absolute bottom-0 w-full">
                    <Footer />
                </footer>
            </div>
        </div>
    )
}
