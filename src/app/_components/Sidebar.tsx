import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div>
      <ToggleGroup
        type="single"
        className="w-[405px] flex flex-col pt-[124px] items-start px-[80px]"
      >
        <Link href="/">
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            className="h-[36px] py-2"
          >
            <p>Home</p>
          </ToggleGroupItem>
        </Link>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          className="h-[36px] py-2"
        >
          <p>Explore</p>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
          className="h-[36px] py-2"
        >
          <div className="flex items-center gap-2">
            <p>View page</p>
            <ExternalLink />
          </div>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
          className="h-[36px] py-2"
        >
          <p>Account settings</p>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default Sidebar;
