export default function Loading() {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded w-full"></div>
                ))}
            </div>
        </div>
    );
}