import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const page = () => {
  return (
    <div className="mt-[124px] flex flex-col px-[24px] gap-6 rounded-lg bg-[#FFF] w-full">
      <div className="p-6 flex flex-col items-start gap-3 rounded-lg border border-solid border-[#E4E4E7]">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <img
              src="https://img.freepik.com/free-vector/realistic-hand-drawn-fuck-you-symbol_23-2148684365.jpg"
              alt=""
              className="w-[48px] h-[48px] rounded-[48px] "
            />
            <div className="flex flex-col gap-[4px]">
              <p className="font-bold">Jake</p>
              <p>buymeacoffee.com/baconpancakes1</p>
            </div>
          </div>
          <Button>
            <Copy />
            Share page link
          </Button>
        </div>
        <div className="my-4 border w-full bg-gray-200 h-[1px]"></div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center">
            <p className="font-bold text-[20px]">Earnings</p>
            <Select>
              <SelectTrigger className="w-[175px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent className="w-full">
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="font-bold text-[36px]">450$</p>
        </div>
      </div>
      <div className="font-bold  flex justify-between items-center">
        <p>Recent transactions</p>
        <Select>
          <SelectTrigger className="w-[175px]">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>

          <SelectContent className="w-full" defaultValue="1">
            <SelectItem value="1">1$</SelectItem>
            <SelectItem value="2">2$</SelectItem>
            <SelectItem value="3">3$</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-6 flex flex-col items-start gap-4 rounded-lg border border-solid border-[#E4E4E7]"></div>
    </div>
  );
};

export default page;
