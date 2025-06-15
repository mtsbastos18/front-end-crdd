'use client'

interface PaginationProps {
    page: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    handlePageChange: (newPage: number) => void;
}

export function Pagination({
    page,
    hasNextPage,
    hasPrevPage,
    handlePageChange
}: PaginationProps) {
    return (
        <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
                Página <span className="font-medium">{page}</span>
            </div>
            <div className="flex space-x-2">
                <button
                    className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    disabled={!hasPrevPage}
                    onClick={() => handlePageChange(page - 1)}
                >
                    Anterior
                </button>
                <button
                    className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    disabled={!hasNextPage}
                    onClick={() => handlePageChange(page + 1)}
                >
                    Próxima
                </button>
            </div>
        </div>
    )
}