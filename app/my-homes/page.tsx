import React from "react";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


async function getData(userId: string){
    const data = await prisma.home.findMany({
        where: {
            userId: userId,
            addedCategoty: true, 
            addedDescription: true,
            addedLocation: true
        },
        select:{
            id: true,
            country: true,
            photo: true,
            description: true,
            price: true,
            Favorite:{
                where:{
                    userId: userId
                }
            }
        },
        orderBy: {
            createAt: 'desc'
        }
    })

    return data
}
const ListingsPage = async () => {
    const {getUser}= getKindeServerSession()
    const user = await getUser()

    const data = await getData(user?.id as string)
  return <section className="container mx-auto px-5 mt-10 lg:px-10">
    <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
  </section>;
};

export default ListingsPage;
