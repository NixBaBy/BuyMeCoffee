"use client";
import React, { ReactNode } from "react";
import Sidebar from "../_components/Sidebar";
import { useUser } from "../_context/UsersContext";
type Props = {
  children: ReactNode;
};
const HomeLayout = (props: Props) => {
  const { logedUser } = useUser();

  if (!logedUser) {
    return;
  }
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[24px] w-full">
        <Sidebar />
        {props.children}
      </div>
    </div>
  );
};

export default HomeLayout;
