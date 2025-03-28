import ViewPage from "@/app/view-page/page";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = async (props: { params: Promise<{ userId: string }> }) => {
  const { userId } = await props.params;

  return <ViewPage />;
};

export default Page;
