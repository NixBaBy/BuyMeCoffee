"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const Header = () => {
  const [userData, setUserData] = useState<{
    name: string | null;
    image: string | null;
  }>({ name: null, image: null });

  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("name");
    const image = localStorage.getItem("image");
    setUserData({ name, image });
  }, []);

  const logoutHandler = () => {
    router.push("/login");
    localStorage.removeItem("name");
    localStorage.removeItem("image");
  };

  return (
    <div className="flex justify-between items-center absolute top-5 w-full px-[80px]">
      <div className="flex gap-2 items-center">
        <img src="coffee.svg" alt="" />
        <p className="font-bold">Buy Me Coffee</p>
      </div>
      {userData.name && userData.image ? (
        <div className="flex gap-2 py-2 px-4 items-center">
          <img
            src={userData.image || "default-image-url"}
            alt="User Avatar"
            className="w-[40px] h-[40px] rounded-full"
          />
          <p>{userData.name}</p>
          <Popover>
            <PopoverTrigger>
              <ChevronDown />
            </PopoverTrigger>
            <PopoverContent className="w-[163px] min-h-[32px] py-[6px] px-2">
              <button onClick={logoutHandler}>Logout</button>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button className="bg-secondary text-secondary-foreground">
          Login
        </Button>
      )}
    </div>
  );
};

export default Header;
