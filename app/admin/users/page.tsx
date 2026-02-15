'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useUsers } from '@/hooks/use-users';
import UsersTable from '@/components/users/users-table';
import UsersFilters from '@/components/users/users-filters';
import Pagination from '@/components/users/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/use-debounce';

export default function UsersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialSearch = searchParams.get('search') || '';

  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);

  const debounceSearch = useDebounce(search, 500);

  const limit = 10;

  const { data, isLoading, isError, isFetching } = useUsers({
    page,
    limit,
    search: debounceSearch,
  });

  useEffect(() => {
    router.push(`?page=${page}&search=${debounceSearch}`)
  }, [page, debounceSearch, router]);

  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Users Dashboard</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <UsersFilters search={search} setSearch={setSearch} />

          {isLoading && (
            <div className='space-y-2'>
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className='h-10 w-full' />
              ))}
            </div>
          )}

          {isFetching && (
            <span className="text-sm text-muted-foreground">
              Updating...
            </span>
          )}

          {isError && (
            <p className='text-red-500'>Failed to load users.</p>
          )}

          {!isFetching && data && (
            <>
              <UsersTable users={data.users} />
              <Pagination 
                page={page}
                setPage={setPage}
                total={data.total}
                limit={limit}
                isFetching={isFetching}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}