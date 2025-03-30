"use client";
import { useUser } from "@/app/_context/UsersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Camera, Coffee, Fullscreen, Heart } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const [unwrappedParams, setUnwrappedParams] = useState<{
    userId: string;
  } | null>(null);
  const { users } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const searchParams = useSearchParams();

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
  return (
    <div className="w-full pt-[60px]">
      <div className="w-full h-[319px] bg-gray-200 flex justify-center items-center">
        <Image
          src={userData?.profile.backgroundImage || "/placeholder.jpg"}
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
                src={userData?.profile.avatarImage || "/placeholder.jpg"}
                width={48}
                height={48}
                alt=""
                className="rounded-full"
              />
              <p className="font-bold text-[20px]">{userData?.profile.name}</p>
            </div>
            <div className="w-full bg-gray-200 h-[1px]"></div>
            <div className="flex flex-col gap-3">
              <p className="font-bold">About {userData?.profile.name}</p>
              <p>{userData?.profile.about}</p>
            </div>
          </div>
          <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
            <p className="font-bold">Social media URL</p>
            <p className="text-[14px]">{userData?.profile.socialMediaURL}</p>
          </div>
          <div className="p-6 gap-2 flex flex-col border border-solid border-gray-200 rounded-[8px] w-full bg-white">
            <p className="font-bold">Recent Supporters</p>
            <div className="p-6 flex flex-col gap-6 border border-solid border-gray-200 rounded-lg justify-center items-center bg-white">
              <Heart />
              <p>Be the first one to support {userData?.profile.name}</p>
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

export default Page;
