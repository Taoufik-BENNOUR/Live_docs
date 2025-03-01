import AddDocumentBtn from '@/components/AddDocumentBtn'
import Header from '@/components/Header'
import { getDocuments } from '@/lib/actions/room.actions'
import { SignedIn, SignIn, UserButton } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { format} from 'timeago.js';

const Home = async() => {
    const user =await currentUser()
    if(!user) redirect("/sign-in")
    const roomDocuments = await getDocuments(user.emailAddresses[0].emailAddress)
    const documents = []
    return (
    <main className='home-container'>
        <Header className="sticky left-0 top-0">
            <div className='flex items-center gap-2 lg:gap-4'>
                Notification
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
        </Header>
        {roomDocuments.data.length>0? 
        <div className='document-list-container'>
            <div className="document-list-title justify-between">
                <h3 className='text-[28px] font-bold'>All documents</h3>
                <AddDocumentBtn userId={user.id} email={user.emailAddresses[0].emailAddress} />
            </div>
            <ul className='document-ul'>
                {roomDocuments.data.map((document:any)=> 
                <li key={document.id} className='document-list-item'>
                    <Link href={`/documents/${document.id}`} className='flex flex-1 items-center gap-4'>
                        <div className="hidden rounded-md sm:block">
                           <Image src={"/assets/icons/doc.svg"} alt='file' width={40} height={40} /> 
                        </div>
                        <div>
                            <p>{document.metadata.title}</p>
                            <p className='text-sm text-blue-100'>Created about {format(document.createdAt)}</p>
                        </div>
                    </Link>
                </li>
                ) }
            </ul>
        </div>
        :
        <div className='document-list-empty'>
            <Image src={"/assets/icons/doc.svg"} alt='document' className='mx-auto' width={40} height={40} />
            <AddDocumentBtn userId={user.id} email={user.emailAddresses[0].emailAddress} />
        </div>    
    }
    </main>
  )
}

export default Home