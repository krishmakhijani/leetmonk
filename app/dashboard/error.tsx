'use client'

export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen bg-bg-purple p-6 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-solid-purple-light mb-4">
                    Something went wrong!
                </h2>
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-solid-purple-light text-white rounded-md hover:bg-solid-purple-dark transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
