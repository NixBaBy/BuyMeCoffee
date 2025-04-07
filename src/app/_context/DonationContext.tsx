"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { donationType } from "../../../utils/types";

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

  const getData = async () => {
    const res = await fetch(`http://localhost:3000/api/donation`);
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
    const response = await fetch("http://localhost:3000/api/donation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        specialURLOrBuyMeCoffee: url,
        specialMessage: message,
        donorId,
        recipientId,
      }),
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert("Amjilttai donation ilgeelee");
    }
    getData();
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <donationContext.Provider value={{ sentDonation, donations }}>
      {children}
    </donationContext.Provider>
  );
};

export default DonationProvider;
