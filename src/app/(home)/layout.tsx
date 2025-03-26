import React, { ReactNode } from "react";
import Sidebar from "../_components/Sidebar";
type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[24px] w-full">
        <Sidebar />
        {props.children}
      </div>
    </div>
  );
};

export default Authlayout;
