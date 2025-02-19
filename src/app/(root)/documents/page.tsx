import AddDocumentBtn from '@/components/AddDocumentBtn'
import Header from '@/components/Header'
import { SignedIn, SignIn, UserButton } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Home = async() => {
    const user =await currentUser()
    if(!user) redirect("/sign-in")
    
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
        {documents.length>0? 
        <div>

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