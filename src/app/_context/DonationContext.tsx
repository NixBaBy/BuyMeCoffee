"use client";
import React, { createContext, ReactNode, useContext } from "react";

type donationContextType = {
  sentDonation: (
    amount: number,
    url: string,
    message: string,
    donorId: number,
    recipientId: number,
    user_id: number
  ) => void;
};
const donationContext = createContext<donationContextType>(
  {} as donationContextType
);
export const useDonation = () => {
  return useContext(donationContext);
};
const DonationProvider = ({ children }: { children: ReactNode }) => {
  const sentDonation = async (
    amount: number,
    url: string,
    message: string,
    donorId: number,
    recipientId: number,
    user_id: number
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
        user_id,
      }),
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert("Amjilttai donation ilgeelee");
    }
  };

  return (
    <donationContext.Provider value={{ sentDonation }}>
      {children}
    </donationContext.Provider>
  );
};

export default DonationProvider;
