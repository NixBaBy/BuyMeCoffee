"use client";
import { useUser } from "@/app/_context/UsersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Coffee, Heart } from "lucide-react";
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
import { donationINNERJOINType, userType } from "../../../../utils/types";

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const [unwrappedParams, setUnwrappedParams] = useState<{
    userId: string;
  } | null>(null);

  const { users } = useUser();
  const [userData, setUserData] = useState<userType | null>(null);
  const searchParams = useSearchParams();
  const { sentDonation } = useDonation();
  const { logedUser } = useUser();
  const { donations } = useDonation();
  const [loading, setLoading] = useState<boolean>(false);
  console.log(userData);
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
      setUserData(user || null);
    }
  }, [users, userIdFromParams]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (logedUser?.profile?.id && userData?.profile) {
      setLoading(true);
      try {
        await sentDonation(
          values.amount,
          values.url,
          values.message,
          logedUser.profile.id,
          userData.profile.id
        );
      } catch (error) {
        console.error("Error sending donation", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Profile information is missing.");
    }
  };

  const filteredDonations = donations.filter(
    (donation) => donation.recipientId === userData?.id
  );

  return (
    <div className="w-full pt-[60px]">
      <div className="w-full h-[319px] bg-gray-200 flex justify-center items-center">
        <Image
          src={userData?.profile?.backgroundImage || "/placeholder.jpg"}
          alt="loading..."
          width={1010}
          height={319}
          className="w-full h-[319px] object-cover"
        />
      </div>
      <div className="w-screen px-[80px] flex justify-center gap-[40px] mt-[-86px]">
        <div className="flex flex-col gap-[20px] w-full">
          <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
            <div className="flex gap-3 w-full">
              <Image
                src={userData?.profile?.avatarImage || "/placeholder.jpg"}
                width={48}
                height={48}
                alt=""
                className="rounded-full"
              />
              <p className="font-bold text-[20px]">{userData?.profile?.name}</p>
            </div>
            <div className="w-full bg-gray-200 h-[1px]"></div>
            <div className="flex flex-col gap-3">
              <p className="font-bold">About {userData?.profile?.name}</p>
              <p>{userData?.profile?.about}</p>
            </div>
          </div>
          <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
            <p className="font-bold">Social media URL</p>
            <p className="text-[14px]">{userData?.profile?.socialMediaURL}</p>
          </div>
          {filteredDonations.length === 0 ? (
            <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
              <p className="font-bold">Recent Supporters</p>
              <div className="p-6 flex flex-col gap-6 border border-solid border-gray-200 rounded-lg justify-center items-center bg-white">
                <Heart />
                <p>Be the first one to support {userData?.profile?.name}</p>
              </div>
            </div>
          ) : (
            <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
              <p className="font-bold">Recent Supporters</p>
              {filteredDonations.map(
                (donation: donationINNERJOINType, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <img
                      src={
                        donation.avatarImage ||
                        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                      }
                      alt=""
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-1">
                        <p className="font-bold">{donation?.name}</p>
                        <p>bought {donation.amount} coffee</p>
                      </div>
                      <p>{donation.specialMessage}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
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
                          onValueChange={field.onChange}
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Support"}
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
