import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Document = async ({params}:SearchParamProps) => {
  const {id} =await params;
  const clerkUser = await currentUser();
    if(!clerkUser) redirect("/sign-in")
      const room = await getDocument({
      roomId:id,
      userId:clerkUser.emailAddresses[0].emailAddress
  })
  if(!room) redirect("/")
  return (
    <main className='flex flex-col w-full items-center'>
      <CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
    </main>
  )
}

export default Document