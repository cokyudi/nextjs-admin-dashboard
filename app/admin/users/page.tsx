 'use client';

import { useState, useEffect, Suspense } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { CreateUserForm } from '@/components/users/create-user-form';
import { Modal } from '@/components/ui/modal';
import { UsersPageContainer } from '@/components/users/users-page-container';

function UsersPageWithSuspense({ onAddUserClick }: { onAddUserClick: () => void }) {
  return (
    <Suspense fallback={<div className='p-8'>Loading...</div>}>
      <UsersPageContainer onAddUserClick={onAddUserClick} />
    </Suspense>
  );
}

export default function UsersPage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function onOpen() {
      setModalOpen(true);
    }
    window.addEventListener('open:create-user', onOpen as EventListener);
    return () =>
      window.removeEventListener('open:create-user', onOpen as EventListener);
  }, []);

  const handleAddUserClick = () => {
    window.dispatchEvent(new CustomEvent('open:create-user'));
  };

  return (
    <ErrorBoundary>
      <UsersPageWithSuspense onAddUserClick={handleAddUserClick} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title='Create User'>
        <CreateUserForm
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            window.dispatchEvent(new CustomEvent('user:created'));
          }}
        />
      </Modal>
    </ErrorBoundary>
  );
}