import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'

import { Button } from '@/components'

type PaginationProps = {
  handlePreviousPage: () => void
  handleNextPage: () => void
  totalRecords: number
  pageNumber: number
  totalPages: number
}

export const Pagination = ({
  handleNextPage,
  handlePreviousPage,
  totalRecords,
  pageNumber,
  totalPages,
}: PaginationProps) => {
  return (
    <nav className="flex items-center justify-between bg-transparent px-4 py-3 sm:px-6 mt-3" aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-200 space-x-2">{totalRecords} results</p>
      </div>
      <div className="flex flex-1 justify-between items-center sm:justify-end space-x-4">
        <Button onClick={handlePreviousPage} variant="primary" size="md" type="button" disabled={pageNumber === 1}>
          <ArrowLongLeftIcon className="w-6 h-6" />
        </Button>
        <p className="text-sm text-gray-200">{pageNumber}</p>
        <Button onClick={handleNextPage} variant="primary" size="md" type="button" disabled={pageNumber === totalPages}>
          <ArrowLongRightIcon className="w-6 h-6" />
        </Button>
      </div>
    </nav>
  )
}
