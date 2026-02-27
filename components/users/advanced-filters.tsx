'use client';

import React from 'react';
import { User } from '@/lib/schemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface AdvancedFiltersProps {
  users: User[];
  search: string;
  setSearch: (search: string) => void;
  onFilterChange: (filters: FilterState) => void;
  totalUsers: number;
}

export interface FilterState {
  role: 'all' | 'admin' | 'user' | 'manager' | 'moderator';
  status: 'all' | 'active' | 'inactive';
  sortBy: 'id' | 'firstName' | 'lastName' | 'email';
  sortOrder: 'asc' | 'desc';
}

export function AdvancedFilters({
  users,
  search,
  setSearch,
  onFilterChange,
  totalUsers,
}: AdvancedFiltersProps) {
  const [selectedRole, setSelectedRole] = React.useState<FilterState['role']>('all');
  const [selectedStatus, setSelectedStatus] = React.useState<FilterState['status']>('all');
  const [sortBy, setSortBy] = React.useState<FilterState['sortBy']>('id');
  const [sortOrder, setSortOrder] = React.useState<FilterState['sortOrder']>('asc');

  // Notify parent when filters change
  React.useEffect(() => {
    onFilterChange({
      role: selectedRole,
      status: selectedStatus,
      sortBy,
      sortOrder,
    });
  }, [selectedRole, selectedStatus, sortBy, sortOrder, onFilterChange]);

  return (
    <Card className='bg-gray-50'>
      <CardHeader>
        <CardTitle className='text-lg'>Filters & Sorting</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Search */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Search
          </label>
          <Input
            type='text'
            placeholder='Search by name or email...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Role Filter */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as FilterState['role'])}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='all'>All Roles</option>
            <option value='user'>User</option>
            <option value='manager'>Manager</option>
            <option value='moderator'>Moderator</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as FilterState['status'])}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='all'>All Statuses</option>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as FilterState['sortBy'])
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='id'>ID</option>
            <option value='firstName'>First Name</option>
            <option value='lastName'>Last Name</option>
            <option value='email'>Email</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Sort Order
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>

        {/* Results count */}
        <div className='p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700'>
          Showing {users.length} of {totalUsers} users
        </div>
      </CardContent>
    </Card>
  );
}
