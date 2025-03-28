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
  logedUser: string | null;
  logoutHandler: () => void;
};

const userContext = createContext<userContextType>({} as userContextType);
export const useUser = () => {
  return useContext(userContext);
};

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<userType[]>([]);
  const [logedUser, setLogedUser] = useState<string | null>(null);

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
      localStorage.setItem("user", data.user.id);
      setLogedUser(data.user);
      if (data.user.profile) {
        router.push("/");
      } else {
        router.push("/createAccount");
      }
    }
    getData();
  };
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        getData();
        setLogedUser(storedUser);
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error("Error reading user from localStorage:", error);
    }
  }, []);

  const logoutHandler = () => {
    router.push("/login");
    localStorage.clear();
    setLogedUser(null);
  };

  return (
    <userContext.Provider
      value={{ loginUser, users, logedUser, logoutHandler }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UsersProvider;
