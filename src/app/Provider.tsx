'use client';

import Loader from '@/components/ui/Loader';
import { useUser } from '@clerk/nextjs';
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense';
import { ReactNode } from 'react';

const Provider = ({ children }: { children: ReactNode}) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider 
      authEndpoint="/api/liveblocks-auth">
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider