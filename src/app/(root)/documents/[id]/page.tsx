import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import React from 'react'

const Document= () => {
  return (
    <div>
      <Header className=''>
        <div className='flex w-fit gap-2 justify-between'>
          <p className='document-title'>head</p>
        </div>
      </Header>
      <Editor/>
      </div>
  )
}

export default Document