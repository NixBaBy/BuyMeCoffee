"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { donationType } from "../../../utils/types";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

type donationContextType = {
  sentDonation: (
    amount: string,
    url: string,
    message: string,
    donorId: number,
    recipientId: number
  ) => void;
  donations: donationType[];
};
const donationContext = createContext<donationContextType>(
  {} as donationContextType
);
export const useDonation = () => {
  return useContext(donationContext);
};
const DonationProvider = ({ children }: { children: ReactNode }) => {
  const [donations, setDonations] = useState<donationType[]>([]);
  const router = useRouter();
  const getData = async () => {
    const res = await fetch(`/api/donation`);
    if (!res.ok) {
      console.error("Алдаа гарлаа:", res.status);
      return;
    }
    const data = await res.json();
    setDonations(data.donation);
  };

  const sentDonation = async (
    amount: string,
    url: string,
    message: string,
    donorId: number,
    recipientId: number
  ) => {
    const response = await fetch("/api/donation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(amount),
        specialURLOrBuyMeCoffee: url,
        specialMessage: message,
        donorId,
        recipientId,
      }),
    });

    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Amjilttai donation ilgeelee");
      router.push("/successMessage");
    }
    getData();
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <donationContext.Provider value={{ sentDonation, donations }}>
      <Toaster position="top-center" richColors />
      {children}
    </donationContext.Provider>
  );
};

export default DonationProvider;
