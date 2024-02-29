'use client'

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";


export const CreationSubmit = () => {
    const {pending}= useFormStatus()
  return(
    <>
    {pending ? (
        <Button disabled size='lg'>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
        Please wait...
    </Button>
    ): (
        <Button type='submit' size='lg'>
            Next
        </Button>
    )}
    
    </>
  );
};


export function AddToFavoriteButton(){
    const {pending}= useFormStatus()


    return(
        <>
        {pending ? (
                <div>
                    
                </div>

        ): (
            <Button variant='outline' size='icon' className="bg-primary-foreground type='submit">
                <Heart className="w-4 h-4"/>
            </Button>

        )
        
        }
        </>
    )
}