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
               <Button variant='outline' size='icon' className="bg-primary-foreground">
                <Loader2 className="animate-spin text-pretty h-4 w-4"/>
               </Button>

        ): (
            <Button variant='outline' size='icon' className="bg-primary-foreground type='submit">
                <Heart className="w-4 h-4"/>
            </Button>

        )
        
        }
        </>
    )
}
export function DeleteFormFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" className="bg-primary-foreground">
          <Loader2 className="animate-spin text-pretty h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground type='submit"
        >
          <Heart className="w-4 h-4 text-primary" fill="#e21c49" />
        </Button>
      )}
    </>
  );
}

export function ReservationSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
            <Loader2 className="w-4 h-4 mr-2 animate-2"/>
            Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Make a Reservation!
        </Button>
      )}
    </>
  );
}