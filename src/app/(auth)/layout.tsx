import Image from "next/image";
import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="w-full h-screen bg-[#FBBF24] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-[40px]">
          <Image
            src="/login.svg"
            alt=""
            width={240}
            className="w-[240px] h-[240px]"
            height={240}
          />
          <div className="text-center flex flex-col gap-4">
            <p className="font-bold text-[#09090B] text-[24px] ">
              Fund your creative work
            </p>
            <p className="text-[#09090B] text-[16px]">
              Accept support. Start a membership. Setup a shop. It’s easier than
              you think.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">{props.children}</div>
    </div>
  );
};

export default Authlayout;
