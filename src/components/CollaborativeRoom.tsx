"use client"
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Loader from './ui/Loader'
import Header from './Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Editor } from './editor/Editor'
import ActiveCollaborators from './ActiveCollaborators'
import { Input } from './ui/input'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { updateDocument } from '@/lib/actions/user.actions'

const CollaborativeRoom = ({roomId,roomMetadata,users,currentUserType}:CollaborativeRoomProps) => {


  const [editing, setEditing] = useState<Boolean>(false)
  const [loading, setLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const updateTitleHandler = async (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      setLoading(true);
      try {
        if(documentTitle !== roomMetadata.title){
          const updatedDocument = await updateDocument(roomId,documentTitle)
          if(updatedDocument){
            setEditing(false)
          }
        }
      } catch (error) {
        
      }
      setLoading(false);
    }
  }
  useEffect(()=>{
    if(editing&&inputRef.current){
      inputRef.current.focus()
    }
  },[])

  useEffect(() => {
    const handleClickOutside = (e:MouseEvent) =>{
      if(containerRef.current && !containerRef.current.contains(e.target as Node) && documentTitle.trim() !==""){
       setEditing(false); 
       updateDocument(roomId,documentTitle)
      }
    }
    document.addEventListener('mousedown',handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [documentTitle])

  useEffect(() => {
    if(editing && inputRef.current){
      inputRef.current.focus
    }
  }, [editing])
  return (
    <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<Loader/>}>
        <div className='collaborative-room'>
          <Header>
          <div  ref={containerRef} className='flex w-fit items-center justify-center gap-2 ml-96'>
            {editing && !loading ?(<Input type='text'
             value={documentTitle} 
             ref={inputRef} 
             placeholder='enter title'
             onChange={(e)=>setDocumentTitle(e.target.value)}
             onKeyDown={updateTitleHandler}
             disabled={!editing}
             className='document-title-input'
             /> 
          ):
          <>
          <div className='flex gap-2'>
            <p className='document-title'> {documentTitle} </p>
          {currentUserType === "editor" && !editing &&
            <Image src="/assets/icons/edit.svg" alt="edit_icon" width={24} height={24} 
              onClick={()=>setEditing(true)}
              className='cursor-pointer'
            />
           }
          </div>
           </>}

           {loading &&  <p className='text-sm'>Saving ...</p> }
          </div>
          <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
            <ActiveCollaborators/>
          <SignedOut>
                  <SignInButton />
                  {/* <SignUpButton /> */}
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
          </div>
        </Header>
        <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
        </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom