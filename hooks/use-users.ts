import { fetchUsers } from '@/api/user-api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

type Params = {
  page: number
  limit: number
  search: string
  role?: 'all' | 'admin' | 'user' | 'manager' | 'moderator'
  status?: 'all' | 'active' | 'inactive'
  sortBy?: 'id' | 'firstName' | 'lastName' | 'email'
  sortOrder?: 'asc' | 'desc'
}

export function useUsers({ page, limit, search, role, status, sortBy, sortOrder }: Params) {
  return useQuery({
    queryKey: ['users', page, limit, search, role, status, sortBy, sortOrder],
    queryFn: () => fetchUsers({ page, limit, search, role, status, sortBy, sortOrder }),
    placeholderData: keepPreviousData,
  });
}