"use client";
import React, { createContext, ReactNode, useContext } from "react";

type bankCardContextType = {
  createBankCard: (
    country: string,
    firstname: string,
    lastname: string,
    cardNumber: string,
    expiryDate: string,
    userId: number,
    cvc: string
  ) => void;
  changeBankCard: (
    country: string,
    firstname: string,
    lastname: string,
    cardNumber: string,
    expiryDate: string,
    userId: number,
    cvc: string
  ) => void;
};
const bankCardContext = createContext<bankCardContextType>(
  {} as bankCardContextType
);
export const useBankCard = () => {
  return useContext(bankCardContext);
};
const BankCardProvider = ({ children }: { children: ReactNode }) => {
  const createBankCard = async (
    country: string,
    firstname: string,
    lastname: string,
    cardNumber: string,
    expiryDate: string,
    userId: number,
    cvc: string
  ) => {
    const response = await fetch("http://localhost:3000/api/bank-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country,
        firstname,
        lastname,
        cardNumber,
        expiryDate,
        userId,
        cvc,
      }),
    });
    if (!response.ok) {
      console.error("Серверээс алдаа ирлээ:", response.status);
      return;
    }
    const data = await response.json();
    console.log(data);
  };

  const changeBankCard = async (
    country: string,
    firstname: string,
    lastname: string,
    cardNumber: string,
    expiryDate: string,
    userId: number,
    cvc: string
  ) => {
    const response = await fetch("http://localhost:3000/api/bank-card", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country,
        firstname,
        lastname,
        cardNumber,
        expiryDate,
        userId,
        cvc,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.message);
    } else {
      alert("amjilttai soligdloo");
    }
  };

  return (
    <bankCardContext.Provider value={{ createBankCard, changeBankCard }}>
      {children}
    </bankCardContext.Provider>
  );
};

export default BankCardProvider;
