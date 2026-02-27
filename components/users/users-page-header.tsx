import { Button } from '@/components/ui/button';

interface UsersPageHeaderProps {
  onAddUserClick: () => void;
}

export function UsersPageHeader({ onAddUserClick }: UsersPageHeaderProps) {
  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Users Dashboard</h1>
          <p className='text-gray-600 mt-1'>Manage and view users</p>
        </div>
        <div className='flex items-center gap-3'>
          <Button onClick={onAddUserClick} variant='default'>
            + Add User
          </Button>
        </div>
      </div>
    </div>
  );
}
