
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCountries } from "../lib/getCountries";
import CountryFlag from './CountryFlag'
import { Heart } from "lucide-react";
import { AddToFavoriteButton } from "./SubmitButton";



interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
}

const ListingCard = ({
  description,
  imagePath,
  location,
  price,
  userId
}: iAppProps) => {

    const {getCountryByValue}= useCountries()
    const country = getCountryByValue(location)
    const flag = String(country?.flag)
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://vcdnamcrbjpkwbaoqtlf.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="House image"
          fill
          className="rounded-lg object-cover mb-3"
        />

        {userId && 
        <div className='z-10 absolute top-2 right-2'>
          <AddToFavoriteButton/>

        </div>
        }
      </div>

      <Link href={'/'} className="mt-2">
        <h3 className='flex items-center gap-1 text-base  font-medium'><CountryFlag country={`${country?.value}`}/> {country?.label} / {country?.region}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        <p className='pt-2 text-muted-foreground'> <span className="font-medium text-black">${price}</span> Night</p>
        
    
        
      </Link>
    </div>
  );
};

export default ListingCard;
