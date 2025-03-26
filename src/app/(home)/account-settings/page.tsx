"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import ChangePassword from "./components/ChangePassword";
import PaymentChange from "./components/PaymentChange";
import { useUser } from "@/app/_context/UsersContext";
import { Camera } from "lucide-react";

const page = () => {
  const { users, logedUser } = useUser();
  const currentUser = users.find((user) => user.id === logedUser);
  return (
    <div className="mt-[124px] flex flex-col px-[24px] gap-6 rounded-lg bg-[#FFF] w-[650px]">
      <p className="text-[24px] font-bold">My account</p>
      <div className="p-6 flex flex-col items-start gap-6 rounded-lg border border-solid border-[#E4E4E7] w-full">
        <p className="font-bold">Personal info</p>
        <div className="flex flex-col gap-3">
          <p className="text-[14px] font-bold">Add photo</p>
          <div
            className=" w-[160px] h-[160px] rounded-full bg-center bg-cover"
            style={{ backgroundImage: `url(${currentUser?.profile.image})` }}
          >
            <Input
              type="file"
              className="w-[160px] h-[160px] rounded-full opacity-0"
            />
            <Camera color="white" />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-2">
            <p>Name</p>
            <Input defaultValue={currentUser?.profile.name} />
          </div>
          <div className="flex flex-col gap-2">
            <p>About</p>
            <Input defaultValue={currentUser?.profile.about} />
          </div>
          <div className="flex flex-col gap-2">
            <p>Social media URL</p>
            <Input defaultValue={currentUser?.profile.socialMediaURL} />
          </div>
          <Button>Save changes</Button>
        </div>
      </div>
      <ChangePassword />
      <PaymentChange />
      <div className="p-6 flex flex-col items-start gap-6 rounded-lg border border-solid border-[#E4E4E7] w-full">
        <p className="font-bold">Success page</p>
        <div className="flex flex-col gap-2">
          <p>Confirmation message</p>
          <Input />
        </div>
        <Button className="w-full">Save changes</Button>
      </div>
    </div>
  );
};

export default page;
