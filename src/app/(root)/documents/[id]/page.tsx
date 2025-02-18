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
      <Editor/>
      </div>
  )
}

export default Document