"use client";
import React, { createContext, ReactNode, useContext } from "react";

type profileContextType = {
  createProfile: (
    avatarImage: string,
    name: string,
    about: string,
    socialMediaURL: string,
    userId: number
  ) => void;
};
const profileContext = createContext<profileContextType>(
  {} as profileContextType
);
export const useProfile = () => {
  return useContext(profileContext);
};
const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const createProfile = async (
    avatarImage: string,
    name: string,
    about: string,
    socialMediaURL: string,
    userId: number
  ) => {
    const response = await fetch("http://localhost:3000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatarImage,
        name,
        about,
        socialMediaURL,
        userId,
      }),
    });
    if (!response.ok) {
      console.error("Серверээс алдаа ирлээ:", response.status);
      return;
    }
    const data = await response.json();
    console.log(data);
  };
  return (
    <profileContext.Provider value={{ createProfile }}>
      {children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;
