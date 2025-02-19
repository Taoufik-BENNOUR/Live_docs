import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image'
import React from 'react'

const ActiveCollaborators = () => {
    const others = useOthers()
    const collaborators = others.map((other)=>other.info)
  return (
    <div>{collaborators.map((collaborator)=>(
        <li key={collaborator.id}>
            <Image src={collaborator.avatar} alt='' width={100} height={100} className='inline-block size-8 rounded-full' />
        </li>
    ))
        
    }</div>
  )
}

export default ActiveCollaborators