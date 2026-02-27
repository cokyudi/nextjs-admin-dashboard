import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserOptimistic } from '@/api/user-api';
import { CreateUserForm } from '@/lib/schemas';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: CreateUserForm) => createUserOptimistic(userData),
    onMutate: async (newUser) => {
      // Cancel any outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ['users'] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData(['users']);

      // Optimistically update with new user in all users queries
      queryClient.setQueriesData({ queryKey: ['users'] }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          users: [
            {
              id: Math.floor(Math.random() * 100000),
              ...newUser,
            },
            ...old.users,
          ],
          total: old.total + 1,
        };
      });

      return { previousUsers };
    },
    onError: (_, __, context: any) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
