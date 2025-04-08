"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "../_context/UsersContext";
import Image from "next/image";
import { Camera, Coffee, Heart } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { handleUpload } from "@/lib/handle-upload";

const formSchema = z.object({
  img: z.string().min(0, {
    message: "zuragaa oruulna uu",
  }),
});
const ViewPage = () => {
  const { logedUser } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      img: logedUser?.profile?.backgroundImage || "",
    },
  });
  if (!logedUser?.profile) {
    return <p>Loading...</p>;
  }

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const files = e.target.files[0];
    if (files) {
      setFile(files);
      const tempImageUrl = URL.createObjectURL(files);
      setImage(tempImageUrl);
      form.setValue("img", "uploaded");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const uploadedImsageUrl = await handleUpload(file);
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          backgroundImage: uploadedImsageUrl,
          user_id: logedUser?.id,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const deleteHandler = () => {
    setImage("");
    setFile(null);
  };

  return (
    <div className="w-full pt-[60px]">
      <div className="w-full h-[319px] bg-gray-200 flex justify-center items-center relative">
        {logedUser.profile.backgroundImage ? (
          <div className="w-full">
            <img
              src={logedUser.profile.backgroundImage}
              alt=""
              className="w-full h-[319px] object-cover"
            />
            <Button className="bg-white absolute text-black right-20 top-4">
              Change Cover
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="img"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel className="flex justify-center items-center">
                      {!image ? (
                        <Button>
                          <Camera />
                          Add a cover image
                        </Button>
                      ) : (
                        ""
                      )}
                    </FormLabel>
                    <FormControl>
                      <div className=" ">
                        {image ? (
                          <div className="flex justify-center items-center ">
                            <img
                              className="w-full h-[319px] object-cover"
                              src={image}
                              alt="zurag"
                            />
                          </div>
                        ) : (
                          <div className="flex justify-center items-center ">
                            <Input
                              placeholder="image"
                              type="file"
                              onChange={handleFile}
                              {...rest}
                              className="w-[165px] mt-[-50px] opacity-0"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute right-20 top-4 flex gap-1">
                <Button type="submit" disabled={loading}>
                  {loading ? "loading..." : "Save changes"}
                </Button>
                <Button className="bg-white text-black" onClick={deleteHandler}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
      <div className="w-screen px-[80px] flex justify-center gap-[40px] mt-[-86px] z-10 relative">
        <div className="flex flex-col gap-[20px] w-full">
          <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
            <div className="flex gap-3 w-full">
              <Image
                src={logedUser?.profile.avatarImage || "/placeholder.jpg"}
                width={48}
                height={48}
                alt=""
                className="rounded-full"
              />
              <p className="font-bold text-[20px]">{logedUser?.profile.name}</p>
            </div>
            <div className="w-full bg-gray-200 h-[1px]"></div>
            <div className="flex flex-col gap-3">
              <p className="font-bold">About {logedUser?.profile.name}</p>
              <p>{logedUser?.profile.about}</p>
            </div>
          </div>
          <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
            <p className="font-bold">Social media URL</p>
            <p className="text-[14px]">{logedUser?.profile.socialMediaURL}</p>
          </div>
          <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
            <p className="font-bold">Recent Supporters</p>
            <div className="p-6 flex flex-col gap-6 border border-solid border-gray-200 rounded-lg justify-center items-center bg-white">
              <Heart />
              <p>Be the first one to support {logedUser?.profile.name}</p>
            </div>
          </div>
        </div>

        <div className="p-6 gap-6 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
          <p>Buy Space ranger a Coffee</p>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Select amount:</p>
            <ToggleGroup type="single">
              <ToggleGroupItem value="1" aria-label="Toggle bold">
                <div className="flex gap-2">
                  <Coffee /> <p>$1</p>
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem value="2" aria-label="Toggle italic">
                <div className="flex gap-2">
                  <Coffee /> <p>$2</p>
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem value="3" aria-label="Toggle strikethrough">
                <div className="flex gap-2">
                  <Coffee /> <p>$3</p>
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem value="4" aria-label="Toggle strikethrough">
                <div className="flex gap-2">
                  <Coffee /> <p>$4</p>
                </div>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex flex-col gap-2">
            <p>Enter BuyMeCoffee or social account URL:</p>
            <Input placeholder="buymecoffee.com/" />
          </div>

          <div className="flex flex-col gap-2">
            <p>Special message:</p>
            <Input placeholder="Please write your message here" />
          </div>
          <Button>Support</Button>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
