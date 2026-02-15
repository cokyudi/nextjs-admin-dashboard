import { Input } from '@/components/ui/input';

type Props = {
  search: string
  setSearch: (value: string) => void
}

export default function UsersFilters({ search, setSearch }: Props) {
  return (
    <div className='flex items-center gap-4'>
      <Input 
        placeholder='Search users'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='max-w-sm'
      />
    </div>
  )
}