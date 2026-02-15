import { useQuery, keepPreviousData } from '@tanstack/react-query';

type Params = {
  page: number
  limit: number
  search: string
}

export function useUsers({ page, limit, search }: Params) {
  return useQuery({
    queryKey: ['users', page, limit, search],
    queryFn: async () => {
      const skip = (page - 1) * limit;

      const url = search
        ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
      
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }

      return res.json();
    },
    placeholderData: keepPreviousData,
  });
}