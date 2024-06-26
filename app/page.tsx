
import { Suspense } from "react";
import ListingCard from "./components/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "@/lib/db";
import SkeletonCard from "./components/SkeletonCard";
import NoItem from "./components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData({searchParams, userId}:{userId: string | undefined,searchParams?:{
  filter? : string
  country?: string
  guest?: string
  room?: string
  bathroom?: string
}}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategoty: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guest: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
      
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite:{
        where: {
          userId: userId ?? undefined
        }
      }
    },
  });

  return data;
}

export default function Home({searchParams}:{searchParams?:{
  filter? : string
  country?: string
  guest?: string
  room?: string
  bathroom?: string
}}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={< SkeletonLoading/>}>

      <ShowItems searchParams={searchParams}/>
      </Suspense>

    </div>
  );
}


async function ShowItems({searchParams}:{searchParams?:{
  filter? : string
  country?: string
  guest?: string
  room?: string
  bathroom?: string
}}){

  const {getUser}= getKindeServerSession()
  const user = await getUser()
  const data = await getData({searchParams: searchParams,userId: user?.id});

  if(data.length === 0) return <NoItem title="No Listings Found" description="Please  try another search or create your own Listings"/>

  return(
    <div className="container mx-auto px-5 lg:px-10">
     
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
        {data.map((item) => {
          return (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              userId={user?.id}
              favoriteId={item?.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
            />
          );
        })}
      </div>
    </div>
  )
}

function SkeletonLoading(){
  return(
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
    </div>
  )
}