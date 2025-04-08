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
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { logedUser, logoutHandler } = useUser();
  const pathname = usePathname();
  const { push } = useRouter();

  const buttonText = pathname === "/sign-up" ? "Login" : "Sign Up";

  const handleClick = () => {
    if (pathname === "/sign-up") {
      push("/login");
      return;
    }

    push("/sign-up");
  };
  const imageSrc = logedUser?.profile?.avatarImage?.startsWith("http")
    ? logedUser.profile.avatarImage
    : "/defaultImage.jpg";
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
          {logedUser.profile?.avatarImage ? (
            <Image
              width={40}
              height={40}
              src={imageSrc}
              alt="User Avatar"
              className=" rounded-full"
            />
          ) : (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          <p>{logedUser?.profile?.name}</p>
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
        <Button
          onClick={handleClick}
          className="bg-secondary text-secondary-foreground"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default Header;
