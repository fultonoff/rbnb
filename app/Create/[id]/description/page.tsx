import Counter from "@/app/components/Counter";
import CreationBottomBar from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const DescriptionPage = () => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors text-center">
          Please, describe your home as good as you can{" "}
        </h2>
      </div>

      <form>
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title:</Label>

            <Input
              type="text"
              name="title"
              required
              placeholder="Short and simple..."
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              placeholder="please descibe your home..."
            ></Textarea>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              required
              placeholder="Price per night in USD"
              min={10}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input type="file" name="image" required />
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Guests</h3>
                  <p className="text-muted-foreground text-sm">How many guest do you want</p>
                </div>
                <Counter/>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Rooms</h3>
                  <p className="text-muted-foreground text-sm">How many Rooms do you have</p>
                </div>
                <Counter/>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">How many Bathrooms do you have</p>
                </div>
                <Counter/>
              </div>
            </CardHeader>
          </Card>
        </div>

        <CreationBottomBar/>
      </form>
    </>
  );
};

export default DescriptionPage;
