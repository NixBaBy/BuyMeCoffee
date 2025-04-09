"use client";
import React, { createContext, ReactNode, useContext } from "react";
import { toast, Toaster } from "sonner";
import { useUser } from "./UsersContext";

type profileContextType = {
  createProfile: (
    avatarImage: string,
    name: string,
    about: string,
    socialMediaURL: string,
    userId: number
  ) => void;
  changeProfile: (
    avatarImage: string,
    name: string,
    about: string,
    URL: string,
    id: number
  ) => void;
  createSuccessMessage: (successMessage: string, id: number) => void;
};
const profileContext = createContext<profileContextType>(
  {} as profileContextType
);
export const useProfile = () => {
  return useContext(profileContext);
};
const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { getData } = useUser();
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
        avatarImage: avatarImage,
        name: name,
        about,
        socialMediaURL: socialMediaURL,
        user_id: userId,
      }),
    });

    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      console.log("Profile үүссэн, ID:", data.profile_id);
    }
  };

  const changeProfile = async (
    avatarImage: string,
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
      body: JSON.stringify({
        avatarImage,
        name,
        about,
        socialMediaURL: URL,
        id,
      }),
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("amjilttai soligdloo");
    }
    getData();
  };

  const createSuccessMessage = async (successMessage: string, id: number) => {
    const response = await fetch("http://localhost:3000/api/success-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        successMessage,
        id,
      }),
    });

    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("SuccessMessage үүссэн");
    }
  };

  return (
    <profileContext.Provider
      value={{ createProfile, changeProfile, createSuccessMessage }}
    >
      <Toaster position="top-center" richColors />
      {children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;
