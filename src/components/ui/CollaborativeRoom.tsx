"use client"
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React, { ReactNode } from 'react'
import Loader from './Loader'
import Header from '../Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<Loader/>}>
        <div className='collaborative-room'>
          <Header className='flex w-fit justify-between'>
          <div className='flex w-fit gap-2 justify-between'>
            <p className='document-title'>head</p>
          </div>
          <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
          <SignedOut>
                  <SignInButton />
                  {/* <SignUpButton /> */}
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
          </div>
        </Header>
        </div>
        </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom