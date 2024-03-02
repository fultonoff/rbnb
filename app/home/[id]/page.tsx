/* eslint-disable @next/next/no-img-element */
import { useCountries } from "@/app/lib/getCountries";
import prisma from "@/lib/db";
import Image from "next/image";
import CountryFlag from "@/app/components/CountryFlag";
import { Separator } from "@/components/ui/separator";
import CategoryShoCase from "@/app/components/CategoryShoCase";
import HomeMap from "@/app/components/HomeMap";

async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      guest: true,
      title: true,
      price: true,
      bedrooms: true,
      bathrooms: true,
      categoryName: true,
      description: true,
      country: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}
const HomeRoute = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  return (
    <section
      className="
  w-[75%] mx-auto mt-10 mb-12"
    >
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt={"home image"}
          src={`https://vcdnamcrbjpkwbaoqtlf.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            <CountryFlag country={country?.value} /> {country?.label}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guest} Guest</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
            <p>{data?.bathrooms} Bathroom</p>
          </div>
          <div className="flex items-center mt-6">
            <img
              alt="user"
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>

          <Separator className="my-7" />
          <CategoryShoCase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>
      </div>
    </section>
  );
};

export default HomeRoute;
