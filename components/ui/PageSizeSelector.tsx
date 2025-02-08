
interface PageSizeSelectorProps {
    pageSize: number
    onPageSizeChange: (size: number) => void
}

export function PageSizeSelector({ pageSize, onPageSizeChange }: PageSizeSelectorProps) {
    return (
        <div className="flex items-center gap-2 text-text-purple-light text-sm">
            <span>Rows per page:</span>
            <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="
            bg-interactive-purple-medium
            border
            border-border-purple-dark
            rounded
            px-2
            py-1
            text-text-purple-light
            focus:outline-none
            focus:border-solid-purple-light
            cursor-pointer
          "
            >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    )
}
