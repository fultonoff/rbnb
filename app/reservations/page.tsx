import React from "react";
import ListingCard from "../components/ListingCard";
import NoItem from "../components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

const getData = async (userId: string) => {
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId
    },
    select:{
      Home:{
        select:{
          id:true,
          country: true,
          photo: true,
          description: true,
          price: true,
          Favorite:{
            where: {
              userId: userId,
            }
          }


        }
      }
    }
  });

  return data
};


const ReservationRoute = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if(!user?.id)return redirect('/')

  const data = await getData(user.id)
  return (
    <section className="container px-5 mx-auto mt-10 lg:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Reservations</h2>

      {data.length === 0 ? (
        <NoItem
          description="You don't have any Reservations."
          title="Please make a Reservation"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathName="/favorites"
              homeId={item.Home?.id as string}
              imagePath={item.Home?.photo as string}
              price={item.Home?.price as number}
              userId={user.id as string}
              favoriteId={item.Home?.Favorite[0]?.id as string}
              isInFavoriteList={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReservationRoute;
