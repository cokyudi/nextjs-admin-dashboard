import { AdvancedFilters, FilterState } from '@/components/users/advanced-filters';
import { User } from '@/lib/schemas';

interface UsersPageSidebarProps {
  users: User[] | null;
  isLoading: boolean;
  search: string;
  onSearchChange: (search: string) => void;
  onFilterChange: (filters: FilterState) => void;
  totalUsers: number;
}

export function UsersPageSidebar({
  users,
  isLoading,
  search,
  onSearchChange,
  onFilterChange,
  totalUsers,
}: UsersPageSidebarProps) {
  return (
    <div className='lg:col-span-1'>
      {!isLoading && (
        <AdvancedFilters
          users={users || []}
          search={search}
          setSearch={onSearchChange}
          onFilterChange={onFilterChange}
          totalUsers={totalUsers}
        />
      )}
    </div>
  );
}
