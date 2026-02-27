import { supabase } from '@/lib/supabase';

export interface UserRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  role: 'admin' | 'user' | 'manager' | 'moderator';
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

interface FetchUsersParams {
  page: number;
  limit: number;
  search?: string;
  role?: 'all' | 'admin' | 'user' | 'manager' | 'moderator';
  status?: 'all' | 'active' | 'inactive';
  sortBy?: 'id' | 'firstName' | 'lastName' | 'email';
  sortOrder?: 'asc' | 'desc';
}

interface FetchUsersResult {
  users: UserRecord[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Transform database row to UserRecord format
 */
function transformUserRecord(dbUser: any): UserRecord {
  return {
    id: dbUser.id,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
    email: dbUser.email,
    phone: dbUser.phone,
    department: dbUser.department,
    role: dbUser.role,
    status: dbUser.status,
    createdAt: dbUser.created_at,
    updatedAt: dbUser.updated_at,
  };
}

/**
 * Fetch users from database with filters, search and pagination
 */
export async function fetchUsersFromDb(
  params: FetchUsersParams
): Promise<FetchUsersResult> {
  const {
    page,
    limit,
    search,
    role = 'all',
    status = 'all',
    sortBy = 'id',
    sortOrder = 'asc',
  } = params;
  const skip = (page - 1) * limit;

  let query = supabase.from('users').select('*', { count: 'exact' });

  // Apply search filter
  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`
    );
  }

  // Apply role filter
  if (role !== 'all') {
    query = query.eq('role', role);
  }

  // Apply status filter
  if (status !== 'all') {
    query = query.eq('status', status);
  }

  // Apply sorting
  const orderedQuery = query.order(getSortColumn(sortBy), {
    ascending: sortOrder === 'asc',
  });

  // Apply pagination
  const { data, error, count } = await orderedQuery.range(skip, skip + limit - 1);

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  // Transform data
  const users = (data || []).map(transformUserRecord);

  return {
    users,
    total: count || 0,
    skip,
    limit,
  };
}

/**
 * Map frontend sort field names to database column names
 */
function getSortColumn(
  sortBy: 'id' | 'firstName' | 'lastName' | 'email'
): string {
  const sortMap: Record<string, string> = {
    id: 'id',
    firstName: 'first_name',
    lastName: 'last_name',
    email: 'email',
  };
  return sortMap[sortBy] || 'id';
}

/**
 * Create a new user in the database
 */
export async function createUserInDb(userData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  role: 'admin' | 'user' | 'manager' | 'moderator';
  status: 'active' | 'inactive';
}): Promise<UserRecord> {
  const { data, error } = await supabase
    .from('users')
    .insert({
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      department: userData.department,
      role: userData.role,
      status: userData.status,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }

  return transformUserRecord(data);
}
