import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorUIProps {
  error: Error;
  onRetry?: () => void;
  title?: string;
}

export function ErrorUI({
  error,
  onRetry,
  title = 'Error loading data',
}: ErrorUIProps) {
  return (
    <Card className='border-red-200 bg-red-50'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <AlertCircle className='w-5 h-5 text-red-600' />
          <CardTitle className='text-red-900'>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-red-800'>
          {error.message || 'An unexpected error occurred'}
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant='outline'
            className='gap-2'
            size='sm'
          >
            <RefreshCw className='w-4 h-4' />
            Retry
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
