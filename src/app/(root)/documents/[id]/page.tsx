import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import CollaborativeRoom from '@/components/ui/CollaborativeRoom'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import React from 'react'

const Document= () => {
  return (
    <main className='flex flex-col w-full items-center'>
      <CollaborativeRoom/>
      <Editor/>
    </main>
  )
}

export default Document