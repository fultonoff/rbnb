import React from "react";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import NoItem from "../components/NoItem";
import ListingCard from "../components/ListingCard";

async function getData(userId: string) {
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategoty: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return data;
}
const ListingsPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect("/");

  const data = await getData(user?.id as string);
  return (
    <section className="container mx-auto px-5 mt-10 lg:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>

      {data.length === 0 ? (
        <NoItem
          title="You dont have any home listed"
          description="Please list your Home"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {data?.map((item) => {
            return (
              <ListingCard
                key={item.id}
                imagePath={item.photo as string}
                homeId={item.id as string}
                price={item.price as number}
                description={item.description as string}
                location={item.country as string}
                userId={user.id}
                pathName="/my-home"
                favoriteId={item.Favorite[0]?.id}
                isInFavoriteList={item.Favorite.length > 0 ? true : false}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ListingsPage;
