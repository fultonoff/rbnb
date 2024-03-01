import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import NoItem from "../components/NoItem";
import ListingCard from "../components/ListingCard";

async function getData(userId: string) {
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favorite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });

  return data;
}
const Favorites = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");

  const data = await getData(user?.id as string);

  return (
    <section className="container px-5 mx-auto mt-10 lg:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favoties</h2>

      {data.length === 0 ? (
        <NoItem description="You don't have any favorite listing." title="Please favorite a listing"/>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8'>
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
              favoriteId={item.Home?.Favorite[0].id as string}
              isInFavoriteList={(item.Home?.Favorite.length as number) > 0 ? true : false}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
