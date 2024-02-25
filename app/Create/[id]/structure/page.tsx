import { createCategoryPage } from "@/app/actions";
import CreationBottomBar from "@/app/components/CreationBottomBar";
import { SelectCategoty } from "@/app/components/SelectCategory";
import { CreationSubmit } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function StructureRoute({params}: {params: {id: string}}) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h1 className="text=3xl font-semibold tracking-tight transition-colors">
          Which of this best describe your Home
        </h1>
      </div>

      <form action={createCategoryPage} className="relative">

        <input type="hidden"  name='homeId' value={params.id}/>
        <SelectCategoty />

        
        <CreationBottomBar/>
      </form>
    </>
  );
}
