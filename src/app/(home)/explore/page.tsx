"use client";
import { useUser } from "@/app/_context/UsersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { userType } from "../../../../utils/types";
import Link from "next/link";

const Page = () => {
  const [searchValue, setSearchValue] = useState<userType[]>([]);
  const { users } = useUser();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = users.filter((user) =>
      user.profile.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchValue(search);
  };

  return (
    <div className="mt-[124px] flex flex-col px-[24px] gap-6 rounded-lg bg-[#FFF] w-full">
      <p>Explore creators</p>
      <Input
        placeholder="Search name"
        className="w-[243px] px-3 "
        onChange={inputHandler}
      />

      {searchValue.length == 0
        ? users.map((user) => (
            <div
              className="p-6 flex flex-col items-start gap-3 rounded-lg border border-solid border-[#E4E4E7]"
              key={user.id}
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-3 items-center">
                  <Image
                    width={40}
                    height={40}
                    src={user.profile.image}
                    alt={user.profile.name}
                    className="rounded-full"
                  />
                  <p className="text-[20px] font-bold tracking-[-0.5px]">
                    {user.profile.name}
                  </p>
                </div>
                <Link href={`/donation-screen/${user.id}`}>
                  <Button className="bg-secondary text-black">
                    View Profile
                    <ExternalLink />
                  </Button>
                </Link>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-[14px]">
                  <p className="font-bold">About {user.profile.name}</p>
                  <p className="text-[14px] w-[420px]">{user.profile.about}</p>
                </div>
                <div className="flex flex-col gap-[14px]">
                  <p className="font-bold">Social media URL</p>
                  <p className="text-[14px]">{user.profile.socialMediaURL}</p>
                </div>
              </div>
            </div>
          ))
        : searchValue.map((user) => (
            <div
              className="p-6 flex flex-col items-start gap-3 rounded-lg border border-solid border-[#E4E4E7]"
              key={user.id}
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-3 items-center">
                  <Image
                    width={40}
                    height={40}
                    src={user.profile.image}
                    alt={user.profile.name}
                    className="rounded-full"
                  />
                  <p className="text-[20px] font-bold tracking-[-0.5px]">
                    {user.profile.name}
                  </p>
                </div>
                <Button variant={"outline"}>
                  View Profile
                  <ExternalLink />
                </Button>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-[14px]">
                  <p className="font-bold">About {user.profile.name}</p>
                  <p className="text-[14px] w-[420px]">{user.profile.about}</p>
                </div>
                <div className="flex flex-col gap-[14px]">
                  <p className="font-bold">Social media URL</p>
                  <p className="text-[14px]">{user.profile.socialMediaURL}</p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Page;
