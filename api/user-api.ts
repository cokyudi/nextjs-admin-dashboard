import { UsersListSchema, UserSchema } from '@/lib/schemas';
import { fetchUsersFromDb, createUserInDb } from '@/services/user.service';
import { z } from 'zod';

type Params = {
  page: number
  limit: number
  search: string
  role?: 'all' | 'admin' | 'user' | 'manager' | 'moderator'
  status?: 'all' | 'active' | 'inactive'
  sortBy?: 'id' | 'firstName' | 'lastName' | 'email'
  sortOrder?: 'asc' | 'desc'
}

/**
 * API endpoint to fetch users with search and pagination
 * Orchestrates service layer calls and validates response
 */
export const fetchUsers = async ({ page, limit, search, role, status, sortBy, sortOrder }: Params) => {
  try {
    // Fetch from service layer
    const result = await fetchUsersFromDb({
      page,
      limit,
      search,
      role,
      status,
      sortBy,
      sortOrder,
    });

    // Validate response structure
    const validated = UsersListSchema.parse(result);

    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid response format: ${error.issues[0]?.message}`);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch users');
  }
};

/**
 * API endpoint to create a new user
 * Validates input and delegates to service layer
 */
export const createUserOptimistic = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  role: 'admin' | 'user' | 'manager' | 'moderator';
  status: 'active' | 'inactive';
}) => {
  try {
    // Validate input
    UserSchema.parse({
      ...userData,
      id: Math.random() * 1000,
    });

    // Create user via service layer
    const user = await createUserInDb(userData);

    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create user');
  }
};