"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "../_context/UsersContext";
import { useDonation } from "../_context/DonationContext";
import { donationINNERJOINType } from "../../../utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const Page = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const { donations } = useDonation();

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const { logedUser } = useUser();
  if (!logedUser?.profile) {
    return <p>Loading...</p>;
  }

  const filteredDonations = donations.filter((donation) => {
    const byUser = donation.recipientId === logedUser?.profile?.id;
    const byAmount =
      selectedValue && selectedValue !== "All"
        ? donation.amount.toString() === selectedValue
        : true;
    return byUser && byAmount;
  });

  return (
    <div className="mt-[124px] flex flex-col px-[24px] gap-6 rounded-lg bg-[#FFF] w-full">
      <div className="p-6 flex flex-col items-start gap-3 rounded-lg border border-solid border-[#E4E4E7]">
        <div className="flex justify-between items-center w-full ">
          <div className="flex gap-3 items-center">
            {logedUser.profile.avatarImage ? (
              <Image
                src={logedUser?.profile.avatarImage || "defaultImage.jpg"}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col gap-[4px]">
              <p className="font-bold">{logedUser.profile.name}</p>
              <p>{logedUser.profile.about}</p>
            </div>
          </div>
          <Button>
            <Copy />
            Share page link
          </Button>
        </div>

        <div className="my-4 border w-full bg-gray-200 h-[1px]"></div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center">
            <p className="font-bold text-[20px]">Earnings</p>
            <Select>
              <SelectTrigger className="w-[175px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent className="w-full">
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="font-bold text-[36px]">450$</p>
        </div>
      </div>
      <div className="font-bold  flex justify-between items-center">
        <p>Recent transactions</p>
        <Select
          value={selectedValue ?? undefined}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="w-[175px]">
            <SelectValue placeholder="Select">
              {selectedValue ? `${selectedValue} $` : "Select"}
            </SelectValue>
          </SelectTrigger>

          <SelectContent className="w-full">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="1">1$</SelectItem>
            <SelectItem value="2">2$</SelectItem>
            <SelectItem value="3">3$</SelectItem>
            <SelectItem value="4">4$</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-6 flex flex-col items-start gap-4 rounded-lg border border-solid border-[#E4E4E7] w-full">
        {filteredDonations.map((donation: donationINNERJOINType, index) => (
          <div key={index} className="flex flex-col gap-4 w-full">
            <div className="flex gap-3 items-center">
              {donation.avatarImage ? (
                <img
                  src={donation.avatarImage}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              ) : (
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-1">
                  <p className="font-bold">{donation?.name}</p>
                  <p className="text-[12px]">{donation.socialMediaURL}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">+ ${donation?.amount}</p>
                  <p>10 hours ago</p>
                </div>
              </div>
            </div>
            <p>{donation.specialMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
