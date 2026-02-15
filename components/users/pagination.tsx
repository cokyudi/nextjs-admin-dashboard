import { Button } from '@/components/ui/button';

type Props = {
  page: number
  setPage: (page: number) => void
  total: number
  limit: number
  isFetching: boolean
}

export default function Pagination({
  page,
  setPage,
  total,
  limit,
  isFetching
}: Props) {

  const totalPages = Math.ceil(total / limit);

  return (
    <div className='flex items-center justify-between'>
      <Button
        variant='outline'
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </Button>

      <span className='text-sm text-muted-foreground'>
        Page {page} of {totalPages}
      </span>

      <Button
        variant='outline'
        disabled={page === totalPages || isFetching}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}