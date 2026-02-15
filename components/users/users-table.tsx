import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
}

export default function UsersTable({ users }: { users: User[] }) {
  if (!users.length) {
    return <p>No users found</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}