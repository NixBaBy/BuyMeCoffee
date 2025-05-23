"use client";
import { useUser } from "@/app/_context/UsersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Page = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { users } = useUser();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredUsers = searchValue
    ? users.filter((user) =>
        user.profile?.name?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : users;

  return (
    <div className="mt-[124px] flex flex-col px-[24px] gap-6 rounded-lg bg-[#FFF] w-full">
      <p>Explore creators</p>
      <Input
        placeholder="Search name"
        className="w-[243px] px-3"
        value={searchValue}
        onChange={inputHandler}
      />
      {filteredUsers.map((user) => (
        <div
          className="p-6 flex flex-col items-start gap-3 rounded-lg border border-solid border-[#E4E4E7]"
          key={user.id}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-3 items-center">
              {user.profile?.avatarImage ? (
                <Image
                  width={40}
                  height={40}
                  src={user?.profile?.avatarImage || "/defaultImage.jpg"}
                  alt="User Avatar"
                  className="rounded-full"
                />
              ) : (
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}

              <p className="text-[20px] font-bold tracking-[-0.5px] object-cover">
                {user?.username || "Unknown"}
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
              <p className="font-bold">
                About {user?.profile?.name || "Unknown"}
              </p>
              <p className="text-[14px] w-[420px]">
                {user?.profile?.about || "No information available"}
              </p>
            </div>
            <div className="flex flex-col gap-[14px]">
              <p className="font-bold">Social media URL</p>
              <p className="text-[14px]">
                {user?.profile?.socialMediaURL || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
