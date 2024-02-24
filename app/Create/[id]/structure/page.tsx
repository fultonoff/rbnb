import { createCategoryPage } from "@/app/actions";
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

        <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
          <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <CreationSubmit/>
          </div>
        </div>
      </form>
    </>
  );
}
