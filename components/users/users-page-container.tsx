'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useUsers } from '@/hooks/use-users';
import { useDebounce } from '@/hooks/use-debounce';
import { User } from '@/lib/schemas';
import { FilterState } from './advanced-filters';
import { UsersPageHeader } from './users-page-header';
import { UsersPageSidebar } from './users-page-sidebar';
import { UsersPageMain } from './users-page-main';

interface UsersPageContainerProps {
  onAddUserClick: () => void;
}

export function UsersPageContainer({ onAddUserClick }: UsersPageContainerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialSearch = searchParams.get('search') || '';
  const initialRole = (searchParams.get('role') as any) || 'all';
  const initialStatus = (searchParams.get('status') as any) || 'all';
  const initialSortBy = (searchParams.get('sortBy') as any) || 'id';
  const initialSortOrder = (searchParams.get('sortOrder') as any) || 'asc';

  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState<FilterState>({
    role: initialRole,
    status: initialStatus,
    sortBy: initialSortBy,
    sortOrder: initialSortOrder,
  });

  const debounceSearch = useDebounce(search, 500);
  const limit = 10;

  const { data, isLoading, isError, error, isFetching, refetch } = useUsers({
    page,
    limit,
    search: debounceSearch,
    role: filters.role,
    status: filters.status,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  });

  // Update URL when page, search, or filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('search', debounceSearch);
    params.set('role', filters.role);
    params.set('status', filters.status);
    params.set('sortBy', filters.sortBy);
    params.set('sortOrder', filters.sortOrder);
    router.push(`?${params.toString()}`);
  }, [page, debounceSearch, filters, router]);

  // Reset page to 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  // Listen for external create-user events to refetch list
  useEffect(() => {
    function onUserCreated() {
      refetch();
    }
    window.addEventListener('user:created', onUserCreated as EventListener);
    return () =>
      window.removeEventListener('user:created', onUserCreated as EventListener);
  }, [refetch]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  }, []);

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className='p-8 max-w-7xl mx-auto'>
      <UsersPageHeader onAddUserClick={onAddUserClick} />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
        <UsersPageSidebar
          users={data?.users || null}
          isLoading={isLoading}
          search={search}
          onSearchChange={setSearch}
          onFilterChange={handleFilterChange}
          totalUsers={data?.total || 0}
        />

        <UsersPageMain
          users={data?.users || []}
          search={search}
          onSearchChange={setSearch}
          page={page}
          onPageChange={setPage}
          total={data?.total || 0}
          limit={limit}
          isLoading={isLoading}
          isError={isError}
          error={error}
          isFetching={isFetching}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
}
