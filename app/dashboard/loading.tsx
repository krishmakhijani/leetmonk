export default function Loading() {
    return (
        <div className="min-h-screen bg-bg-purple p-6">
            <div className="max-w-7xl mx-auto">
                <div className="h-8 w-48 bg-interactive-purple-medium rounded animate-pulse mb-8" />
                <div className="bg-interactive-purple-dark rounded-lg p-6">
                    <div className="space-y-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="h-16 bg-interactive-purple-medium rounded animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
