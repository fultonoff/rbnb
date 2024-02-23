'use client'

import React, { useCallback } from "react";
import { categoryItems } from "../lib/categoryItems";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'


const MapFilterItems = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get('filter')
    const pathname = usePathname()

    const createQueryString = useCallback((name: string, value: string)=>{
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value)

            return params.toString()
    }, [searchParams])
  return (
        <ScrollContainer 	className="scroll-container">
      <div className="flex gap-10 mt-5 w-full ">

      {categoryItems.map((item) => {
        return <Link href={
            `${pathname}?${createQueryString('filter', item.name)}`
        } key={item.id} className={cn(search === item.name ? 'border-b-2 border-black pb-2 flex-shrink-0': 'opacity-70 flex-shrink-0', 'flex flex-col gap-y-3 items-center')}>
            <div className="relative h-6 w-6">
                <Image src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" width={24} height={24}/>

            </div>
            <p className="text-xs font-medium">{item.title}</p>
        </Link>;
      })}

    </div>
        </ScrollContainer>
  );
};

export default MapFilterItems;
