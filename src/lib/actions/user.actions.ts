"use server"
import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";

const clerk = await clerkClient();

export const getClerkUsers = async ({userIds}:{userIds:string[]}) =>{
    try {
        const {data} = await clerk.users.getUserList({
            emailAddress:userIds
        })
        const users = data.map((user:any)=> (
            {
                id:user.id,
                name: `${user.firstName} ${user.lastName}`,
                email:user.emailAddresses[0].emailAddress,
                avatar:user.imageUrl,
            }
        ))
        const sortedUsers = userIds.map((email)=>users.find((user: { email: string; })=>user.email===email))
        return parseStringify(sortedUsers);
    } catch (error) {
        console.log(error);
        
    }
}