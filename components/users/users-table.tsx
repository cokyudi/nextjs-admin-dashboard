import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { User } from '@/lib/schemas';
import { Badge } from '@/components/ui/badge';

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        <p className='text-sm'>No users found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className='text-sm text-gray-600'>{user.id}</TableCell>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant='outline' className='capitalize'>
                {user.role || 'user'}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant='outline'
                className={
                  (user.status || 'active') === 'active'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }
              >
                {user.status || 'active'}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}