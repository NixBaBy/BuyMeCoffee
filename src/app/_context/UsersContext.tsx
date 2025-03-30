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
  signUp: (email: string, password: string, username: string) => void;
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
    const res = await fetch(`http://localhost:3000/api/login`);
    const data = await res.json();
    setUsers(data.data);
  };

  const loginUser = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3000/api/login", {
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
  const signUp = async (email: string, password: string, username: string) => {
    const response = await fetch("http://localhost:3000/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });
    if (!response.ok) {
      console.error("Серверээс алдаа ирлээ:", response.status);
      return;
    }
    try {
      const data = await response.json();
      if (data.error) {
        alert(data.message);
      } else {
        router.push("/login");
      }
      getData();
    } catch (error) {
      console.error("JSON-ийг унших үед алдаа гарсан:", error);
    }
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
  }, [logedUser]);

  const logoutHandler = () => {
    router.push("/login");
    localStorage.clear();
    setLogedUser(null);
  };

  return (
    <userContext.Provider
      value={{ loginUser, users, logedUser, logoutHandler, signUp }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UsersProvider;
