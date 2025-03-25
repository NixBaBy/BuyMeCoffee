import { Button } from "@/components/ui/button";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center absolute top-5 w-full px-[80px]">
      <div className="flex gap-2 items-center">
        <img src="coffee.svg" alt="" />
        <p className="font-bold">Buy Me Coffee</p>
      </div>
      <Button className="bg-secondary text-secondary-foreground">Logout</Button>
    </div>
  );
};

export default Header;
