import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
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
    <div>
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
      <Editor/>
      </div>
  )
}

export default Document