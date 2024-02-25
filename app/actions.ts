'use server'
import prisma from "@/lib/db"
import { redirect } from "next/navigation"


export async function createAirbnbHome({userId}: {userId: string}){
    const data = await prisma.home.findFirst({
        where:{
            userId: userId
        },
        orderBy:{
            createAt: 'desc'
        }
    }) 

    if(data === null){
        const data = await prisma.home.create({
            data:{
                userId: userId
            }
        });

        return redirect(`/create/${data.id}/structure`)
    }else if(!data.addedLocation && !data.addedCategoty && !data.addedDescription){
        return redirect(`/create/${data.id}/structure`)
        
    }else if(data.addedCategoty && !data.addedDescription){
        return redirect(`/create/${data.id}/description`)

    }
}

export async function createCategoryPage(formData: FormData){

    const categoryName = formData.get('categoryName')
    const homeId = formData.get('homeId')
    const data = await prisma.home.update({
        where:{
            id: homeId as string,
        },
        data:{
            categoryName: categoryName as string,
            addedCategoty: true
        }
    })

    return redirect(`/create/${homeId}/description`)
}

export async function createDescription(formData: FormData){

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = formData.get('price')
    const imageFile = formData.get('image') as File

}