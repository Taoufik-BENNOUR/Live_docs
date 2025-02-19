import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export async function POST(request: Request) {
 const clerkUser = await currentUser();
 if(!clerkUser) redirect("/sign-in");

 const {id,firstName,lastName, emailAddresses,imageUrl} = clerkUser;
 const user = {
    id,
    info:{
        id,
        name: `${firstName} ${lastName}`,
        email:emailAddresses[0].emailAddress,
        avatar:imageUrl,
        color:getUserColor(id)
    }
 }
  // Get the current user from your database
 const {status,body} = await liveblocks.identifyUser(
    {
        userId:user.info.email,
        groupIds:[]
    },
    {userInfo:user.info}
 );


  // Retrieve a token from the Liveblocks servers and pass it to the
  // requesting client
  return new Response(body, { status });
}