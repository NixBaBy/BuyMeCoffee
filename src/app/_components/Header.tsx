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

const Header = () => {
  const { logedUser, logoutHandler } = useUser();

  return (
    <div className="flex justify-between items-center absolute top-1 w-full px-[80px]">
      <Link href="/">
        <div className="flex gap-2 items-center">
          <img src="coffee.svg" alt="" />
          <p className="font-bold">Buy Me Coffee</p>
        </div>
      </Link>
      {logedUser ? (
        <div className="flex gap-2 py-2 px-4 items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Cima_da_Conegliano%2C_God_the_Father.jpg/300px-Cima_da_Conegliano%2C_God_the_Father.jpg"
            alt="User Avatar"
            className="w-[40px] h-[40px] rounded-full"
          />
          <p>burhan</p>
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
