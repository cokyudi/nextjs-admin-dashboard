'use client';

import React, { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50'>
          <div className='bg-white rounded-lg shadow-md p-8 max-w-md w-full'>
            <div className='flex items-center gap-2 mb-4'>
              <AlertCircle className='w-6 h-6 text-red-500' />
              <h1 className='text-2xl font-bold text-gray-900'>
                Something went wrong
              </h1>
            </div>
            <p className='text-gray-600 mb-4'>
              {this.state.error?.message ||
                'An unexpected error occurred. Please try again.'}
            </p>
            <Button onClick={this.handleReset} className='w-full'>
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
