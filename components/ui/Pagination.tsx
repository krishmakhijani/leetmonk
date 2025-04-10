
export function PageSizeSelector({
    pageSize,
    onPageSizeChange,
}: {
    pageSize: number
    onPageSizeChange: (size: number) => void
}) {
    return (
        <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-text-purple-light">Show</span>
            <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="bg-interactive-purple-medium text-text-purple-light rounded-md px-2 py-1 text-sm border border-border-purple-dark focus:outline-none focus:ring-2 focus:ring-solid-purple-light"
            >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
            <span className="text-sm text-text-purple-light">per page</span>
        </div>
    );
}

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const getPageNumbers = () => {
        const pages = []
        const isMobile = window.innerWidth < 768

        if (isMobile) {
            if (totalPages <= 3) {
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                if (currentPage <= 2) {
                    pages.push(1, 2, 3, '...', totalPages)
                } else if (currentPage >= totalPages - 1) {
                    pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
                } else {
                    pages.push(1, '...', currentPage, '...', totalPages)
                }
            }
        } else {
            if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                if (currentPage <= 3) {
                    for (let i = 1; i <= 5; i++) {
                        pages.push(i)
                    }
                    pages.push('...')
                    pages.push(totalPages)
                } else if (currentPage >= totalPages - 2) {
                    pages.push(1)
                    pages.push('...')
                    for (let i = totalPages - 4; i <= totalPages; i++) {
                        pages.push(i)
                    }
                } else {
                    pages.push(1)
                    pages.push('...')
                    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                        pages.push(i)
                    }
                    pages.push('...')
                    pages.push(totalPages)
                }
            }
        }
        return pages
    }

    return (
        <div className="flex items-center justify-center gap-1 md:gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="hidden md:block px-3 py-1 rounded-md bg-interactive-purple-medium text-text-purple-light hover:bg-interactive-purple-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Previous
            </button>

            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
                        disabled={typeof page !== 'number'}
                        className={`
                            w-8 h-8
                            rounded-md
                            flex
                            items-center
                            justify-center
                            transition-colors
                            text-sm
                            ${typeof page !== 'number'
                                ? 'cursor-default text-text-purple-light'
                                : page === currentPage
                                    ? 'bg-solid-purple-light text-white'
                                    : 'bg-interactive-purple-medium text-text-purple-light hover:bg-interactive-purple-light'
                            }
                        `}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="hidden md:block px-3 py-1 rounded-md bg-interactive-purple-medium text-text-purple-light hover:bg-interactive-purple-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Next
            </button>
        </div>
    )
}

