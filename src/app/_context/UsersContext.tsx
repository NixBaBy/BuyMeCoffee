"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { userType } from "../../../utils/types";

type userContextType = {
  loginUser: (email: string, password: string) => void;
  users: userType[];
};

const userContext = createContext<userContextType>({} as userContextType);
export const useUser = () => {
  return useContext(userContext);
};

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<userType[]>([]);
  const router = useRouter();

  const getData = async () => {
    const res = await fetch(`http://localhost:3000/api/users`);
    const data = await res.json();
    setUsers(data.data);
  };

  const loginUser = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (data.error) {
      alert(data.message);
    } else {
      router.push("/createAccount");
    }
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <userContext.Provider value={{ loginUser, users }}>
      {children}
    </userContext.Provider>
  );
};

export default UsersProvider;
