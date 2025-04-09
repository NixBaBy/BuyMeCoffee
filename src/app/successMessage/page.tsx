"use client";
import React from "react";
import { useDonation } from "../_context/DonationContext";

const page = () => {
  const { donations } = useDonation();

  console.log(donations);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[696px] p-6 flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col gap-5">
          <div className="bg-[#18BA51] p-[17px] rounded-full w-[64px]">
            <img src="/done.svg" alt="" />
          </div>

          <p>Donation complete</p>
        </div>
        <div className="w-[510px] h-[131px] min-h-[80px] py-2 px-3 flex flex-col gap-2 border border-solid border-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
};

export default page;
