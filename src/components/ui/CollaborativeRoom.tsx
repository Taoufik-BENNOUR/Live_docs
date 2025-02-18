"use client"
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React, { ReactNode } from 'react'
import Loader from './Loader'
import Header from '../Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const CollaborativeRoom = ({children}:{children:ReactNode}) => {
  return (
    <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<Loader/>}>
        <div className='collaborative-rom'>
        <Header className=''>
        <div className='flex w-fit gap-2 justify-between'>
          <p className='document-title'>head</p>
        </div>
          <SignedOut>
                <SignInButton />
                {/* <SignUpButton /> */}
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
      </Header>
        </div>
        </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom