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
            value="Home"
            aria-label="Toggle bold"
            className="h-[36px] py-2"
          >
            <p>Home</p>
          </ToggleGroupItem>
        </Link>
        <Link href="/explore">
          <ToggleGroupItem
            value="Explore"
            aria-label="Toggle italic"
            className="h-[36px] py-2"
          >
            <p>Explore</p>
          </ToggleGroupItem>
        </Link>
        <Link href="/view-page">
          <ToggleGroupItem
            value="ViewPage"
            aria-label="Toggle strikethrough"
            className="h-[36px] py-2"
          >
            <div className="flex items-center gap-2">
              <p>View page</p>
              <ExternalLink />
            </div>
          </ToggleGroupItem>
        </Link>
        <Link href="/account-settings">
          <ToggleGroupItem
            value="AccountSettings"
            aria-label="Toggle strikethrough"
            className="h-[36px] py-2"
          >
            <p>Account settings</p>
          </ToggleGroupItem>
        </Link>
      </ToggleGroup>
    </div>
  );
};

export default Sidebar;
