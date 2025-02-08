import { Spinner } from "@/components/spinner";

export default function Loading() {
    return (
        <div className="min-h-screen bg-bg-purple p-6 flex items-center justify-center">
            <div className="text-center">
                <div className="flex justify-center items-center mb-8">
                    <Spinner className="text-white" size="large">
                        <span className="text-white mt-1">Loading Dashboard</span>
                    </Spinner>
                </div>
            </div>
        </div>
    )
}
