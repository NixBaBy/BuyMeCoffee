"use client";

import React from "react";
import { use } from "react";
import { useDonation } from "../../_context/DonationContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { donationINNERJOINType } from "../../../../utils/types";
import { useUser } from "@/app/_context/UsersContext";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

const Page = ({ params }: PageProps) => {
  const { userId } = use(params);
  const { users } = useUser();
  const router = useRouter();
  console.log(users);
  const filteredDonations: donationINNERJOINType[] = users.filter(
    (user) => user?.profile?.id === Number(userId)
  );

  const buttonHandler = () => {
    router.push("/explore");
  };
  console.log(filteredDonations);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[696px] p-6 flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col gap-5">
          <div className="bg-[#18BA51] p-[17px] rounded-full w-[64px]">
            <img src="/done.svg" alt="" />
          </div>
          <p className="font-bold ml-[-40px]">Donation complete!</p>
        </div>
        {filteredDonations.length > 0 && (
          <div className="w-[510px] h-[131px] min-h-[80px] py-2 px-3 flex flex-col gap-2 border border-solid border-gray-300 rounded-lg">
            <div className="flex items-center gap-2">
              <Image
                src={filteredDonations[0]?.avatarImage || "/default-avatar.jpg"}
                alt=""
                width={32}
                height={32}
                className="rounded-full"
              />
              <p>{filteredDonations[0]?.name}:</p>
            </div>
            <p>{filteredDonations[0]?.successMessage}</p>
          </div>
        )}
        <Button onClick={buttonHandler}>Return to explore</Button>
      </div>
    </div>
  );
};

export default Page;
