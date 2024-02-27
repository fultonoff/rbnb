
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCountries } from "../lib/getCountries";
import CountryFlag from './CountryFlag'



interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
}

const ListingCard = ({
  description,
  imagePath,
  location,
  price,
}: iAppProps) => {

    const {getCountryByValue}= useCountries()
    const country = getCountryByValue(location)
    console.log(country);
    const flag = String(country?.flag)
    console.log(flag);
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://vcdnamcrbjpkwbaoqtlf.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="House image"
          fill
          className="rounded-lg object-cover mb-3"
        />
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
