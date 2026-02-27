import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorUI } from '@/components/error-ui';
import UsersTable from '@/components/users/users-table';
import UsersFilters from '@/components/users/users-filters';
import Pagination from '@/components/users/pagination';
import { User } from '@/lib/schemas';

interface UsersPageMainProps {
  users: User[];
  search: string;
  onSearchChange: (search: string) => void;
  page: number;
  onPageChange: (page: number) => void;
  total: number;
  limit: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  onRetry: () => void;
}

export function UsersPageMain({
  users,
  search,
  onSearchChange,
  page,
  onPageChange,
  total,
  limit,
  isLoading,
  isError,
  error,
  isFetching,
  onRetry,
}: UsersPageMainProps) {
  return (
    <div className='lg:col-span-3'>
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <UsersFilters search={search} setSearch={onSearchChange} />

          {/* Loading State */}
          {isLoading && (
            <div className='space-y-2'>
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className='h-10 w-full' />
              ))}
            </div>
          )}

          {/* Fetching Indicator */}
          {isFetching && !isLoading && (
            <span className='text-sm text-muted-foreground'>
              Updating...
            </span>
          )}

          {/* Error State */}
          {isError && error && (
            <ErrorUI
              error={error as Error}
              onRetry={onRetry}
              title='Failed to load users'
            />
          )}

          {/* Empty State */}
          {!isLoading && !isError && users.length === 0 && (
            <div className='text-center py-8 text-gray-500'>
              <p className='text-sm'>No users found</p>
            </div>
          )}

          {/* Users Table */}
          {!isError && users.length > 0 && (
            <>
              <UsersTable users={users} />
              <Pagination
                page={page}
                setPage={onPageChange}
                total={total}
                limit={limit}
                isFetching={isFetching}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
