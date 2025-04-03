"use client";
import { useUser } from "@/app/_context/UsersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Camera, Coffee, Fullscreen, Heart } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
import { useDonation } from "@/app/_context/DonationContext";

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const [unwrappedParams, setUnwrappedParams] = useState<{
    userId: string;
  } | null>(null);

  const { users } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const searchParams = useSearchParams();
  const { sentDonation } = useDonation();
  const { logedUser } = useUser();

  const formSchema = z.object({
    amount: z.string().min(0, {
      message: "required",
    }),
    url: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    message: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      url: "",
      message: "",
    },
  });

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    };

    getParams();
  }, [params]);

  const userIdFromParams =
    searchParams.get("userId") || unwrappedParams?.userId;

  useEffect(() => {
    if (users && userIdFromParams) {
      const user = users.find((user) => user.id === Number(userIdFromParams));
      setUserData(user);
    }
  }, [users, userIdFromParams]);

  if (!userData) {
    return <p>Loading user...</p>;
  }
  const Fullscreen = window.innerWidth;

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (logedUser?.profile?.id && userData?.profile) {
      sentDonation(
        5,
        values.url,
        values.message,
        userData.profile,
        logedUser.profile.id,
        logedUser.id
      );
    } else {
      console.error("Profile information is missing.");
    }
  }

  return (
    <div className="w-full pt-[60px]">
      <div className="w-full h-[319px] bg-gray-200 flex justify-center items-center">
        <Image
          src={userData?.backgroundImage || "/placeholder.jpg"}
          alt="zurag"
          width={Fullscreen}
          height={319}
        />
      </div>
      <div className="w-screen px-[80px] flex justify-center gap-[40px] mt-[-86px]">
        <div className="flex flex-col gap-[20px] w-full">
          <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
            <div className="flex gap-3 w-full">
              <Image
                src={userData?.avatarImage || "/placeholder.jpg"}
                width={48}
                height={48}
                alt=""
                className="rounded-full"
              />
              <p className="font-bold text-[20px]">{userData?.name}</p>
            </div>
            <div className="w-full bg-gray-200 h-[1px]"></div>
            <div className="flex flex-col gap-3">
              <p className="font-bold">About {userData?.name}</p>
              <p>{userData?.about}</p>
            </div>
          </div>
          <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
            <p className="font-bold">Social media URL</p>
            <p className="text-[14px]">{userData?.socialMediaURL}</p>
          </div>
          <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
            <p className="font-bold">Recent Supporters</p>
            <div className="p-6 flex flex-col gap-6 border border-solid border-gray-200 rounded-lg justify-center items-center bg-white">
              <Heart />
              <p>Be the first one to support {userData?.name}</p>
            </div>
          </div>
        </div>

        <div className="p-6 gap-6 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
          <p>Buy Space ranger a Coffee</p>
          <div className="flex flex-col gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p className="font-bold">Select amount:</p>
                      </FormLabel>
                      <FormControl>
                        <ToggleGroup
                          {...field}
                          type="single"
                          value={field.value}
                        >
                          <ToggleGroupItem value="1" aria-label="Toggle $1">
                            <div className="flex gap-2">
                              <Coffee /> <p>$1</p>
                            </div>
                          </ToggleGroupItem>
                          <ToggleGroupItem value="2" aria-label="Toggle $2">
                            <div className="flex gap-2">
                              <Coffee /> <p>$2</p>
                            </div>
                          </ToggleGroupItem>
                          <ToggleGroupItem value="3" aria-label="Toggle $3">
                            <div className="flex gap-2">
                              <Coffee /> <p>$3</p>
                            </div>
                          </ToggleGroupItem>
                          <ToggleGroupItem value="4" aria-label="Toggle $4">
                            <div className="flex gap-2">
                              <Coffee /> <p>$4</p>
                            </div>
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Enter BuyMeCoffee or social account URL:
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="buymecoffee.com/" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special message:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please write your message here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Support
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
