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
  changeProfile: (name: string, about: string, URL: string, id: number) => void;
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
  };

  const changeProfile = async (
    name: string,
    about: string,
    URL: string,
    id: number
  ) => {
    const response = await fetch("http://localhost:3000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about, URL, id }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.message);
    } else {
      alert("amjilttai soligdloo");
    }
  };
  return (
    <profileContext.Provider value={{ createProfile, changeProfile }}>
      {children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;
