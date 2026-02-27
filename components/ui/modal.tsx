 'use client'

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />

      <div className='relative w-full max-w-2xl mx-4'>
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='flex items-center justify-between px-4 py-3 border-b'>
            <div className='text-lg font-medium'>{title}</div>
            <Button variant='ghost' size='icon' onClick={onClose} aria-label='Close'>
              <X className='w-4 h-4' />
            </Button>
          </div>
          <div className='p-4'>{children}</div>
        </div>
      </div>
    </div>
  );
}
