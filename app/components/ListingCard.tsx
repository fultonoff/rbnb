import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCountries } from "../lib/getCountries";

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

      <Link href={'/'}>
        <h3>{country?.flag} {country?.label} / {country?.region}</h3>
      </Link>
    </div>
  );
};

export default ListingCard;
