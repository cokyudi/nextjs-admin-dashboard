'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserFormSchema, CreateUserForm as CreateUserFormType } from '@/lib/schemas';
import { useCreateUser } from '@/hooks/use-create-user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Check } from 'lucide-react';

interface CreateUserFormProps {
  onSuccess?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserForm({ onSuccess, isOpen, onClose }: CreateUserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateUserFormType>({
    resolver: zodResolver(CreateUserFormSchema),
    mode: 'onChange',
  });

  const createUserMutation = useCreateUser();

  const onSubmit = async (data: CreateUserFormType) => {
    createUserMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
        onSuccess?.();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {/* First Name */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          First Name
        </label>
        <Input
          {...register('firstName')}
          placeholder='John'
          disabled={createUserMutation.isPending}
        />
        {errors.firstName && (
          <p className='text-sm text-red-600 mt-1 flex items-center gap-1'>
            <AlertCircle className='w-3 h-3' />
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Last Name
        </label>
        <Input
          {...register('lastName')}
          placeholder='Doe'
          disabled={createUserMutation.isPending}
        />
        {errors.lastName && (
          <p className='text-sm text-red-600 mt-1 flex items-center gap-1'>
            <AlertCircle className='w-3 h-3' />
            {errors.lastName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Email
        </label>
        <Input
          {...register('email')}
          placeholder='john@example.com'
          type='email'
          disabled={createUserMutation.isPending}
        />
        {errors.email && (
          <p className='text-sm text-red-600 mt-1 flex items-center gap-1'>
            <AlertCircle className='w-3 h-3' />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Phone (Optional)
        </label>
        <Input
          {...register('phone')}
          placeholder='+1 234 567 8900'
          disabled={createUserMutation.isPending}
        />
      </div>

      {/* Department */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Department (Optional)
        </label>
        <Input
          {...register('department')}
          placeholder='Engineering'
          disabled={createUserMutation.isPending}
        />
      </div>

      {/* Role */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Role
        </label>
        <select
          {...register('role')}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50'
          disabled={createUserMutation.isPending}
        >
          <option value='user'>User</option>
          <option value='manager'>Manager</option>
          <option value='admin'>Admin</option>
        </select>
        {errors.role && (
          <p className='text-sm text-red-600 mt-1 flex items-center gap-1'>
            <AlertCircle className='w-3 h-3' />
            {errors.role.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Status
        </label>
        <select
          {...register('status')}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50'
          disabled={createUserMutation.isPending}
        >
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </select>
        {errors.status && (
          <p className='text-sm text-red-600 mt-1 flex items-center gap-1'>
            <AlertCircle className='w-3 h-3' />
            {errors.status.message}
          </p>
        )}
      </div>

      {/* Error Message */}
      {createUserMutation.isError && (
        <div className='p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-center gap-2'>
          <AlertCircle className='w-4 h-4' />
          {createUserMutation.error?.message || 'Failed to create user'}
        </div>
      )}

      {/* Success Message */}
      {createUserMutation.isSuccess && (
        <div className='p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm flex items-center gap-2'>
          <Check className='w-4 h-4' />
          User created successfully!
        </div>
      )}

      {/* Buttons */}
      <div className='flex gap-2 pt-4'>
        <Button
          type='submit'
          disabled={!isValid || createUserMutation.isPending}
          className='flex-1'
        >
          {createUserMutation.isPending ? 'Creating...' : 'Create User'}
        </Button>
        <Button
          type='button'
          variant='outline'
          onClick={() => {
              onClose();
            reset();
          }}
          disabled={createUserMutation.isPending}
          className='flex-1'
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
