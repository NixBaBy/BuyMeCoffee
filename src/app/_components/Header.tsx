"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useUser } from "../_context/UsersContext";
import Image from "next/image";

const Header = () => {
  const { loggedInUser, logoutHandler } = useUser();

  return (
    <div className="flex justify-between items-center absolute top-1 w-full px-[80px]">
      <Link href="/">
        <div className="flex gap-2 items-center">
          <img src="coffee.svg" alt="" />
          <p className="font-bold">Buy Me Coffee</p>
        </div>
      </Link>
      {loggedInUser ? (
        <div className="flex gap-2 py-2 px-4 items-center">
          <Image
            width={40}
            height={40}
            src={loggedInUser?.profile?.avatarImage || "/defaultImage.jpg"}
            alt="User Avatar"
            className=" rounded-full"
          />
          <p>{loggedInUser?.profile?.name}</p>
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
        <Link href="/login">
          <Button className="bg-secondary text-secondary-foreground">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
