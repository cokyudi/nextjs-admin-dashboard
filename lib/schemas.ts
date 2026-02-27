import { z } from 'zod';

// User response validation schema
export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  department: z.string().optional(),
  role: z.enum(['admin', 'user', 'manager', 'moderator']).optional().default('user'),
  status: z.enum(['active', 'inactive']).optional().default('active'),
});

export const UsersListSchema = z.object({
  users: z.array(UserSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

// Create/Update user form schema
export const CreateUserFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  department: z.string().optional(),
  role: z.enum(['admin', 'user', 'manager', 'moderator']),
  status: z.enum(['active', 'inactive']),
});

// Filter schema
export const FilterSchema = z.object({
  search: z.string().optional(),
  role: z.enum(['admin', 'user', 'manager', 'moderator', 'all']).optional(),
  status: z.enum(['active', 'inactive', 'all']).optional(),
  sortBy: z.enum(['firstName', 'lastName', 'email']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type UsersList = z.infer<typeof UsersListSchema>;
export type CreateUserForm = z.infer<typeof CreateUserFormSchema>;
export type Filter = z.infer<typeof FilterSchema>;
