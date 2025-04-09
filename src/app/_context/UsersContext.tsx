"use client";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { userType } from "../../../utils/types";
import { toast, Toaster } from "sonner";
import Loading from "../_components/Loading";

type userContextType = {
  loginUser: (email: string, password: string) => void;
  users: userType[];
  logedUser: userType | null;
  logoutHandler: () => void;
  signUp: (email: string, password: string, username: string) => void;
  changePassword: (email: string, password: string) => {};
  getData: () => void;
};

const userContext = createContext<userContextType>({} as userContextType);
export const useUser = () => {
  return useContext(userContext);
};

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<userType[]>([]);
  const [logedUser, setLogedUser] = useState<userType | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const navigateToPath = (path: string) => router.push(path);

  const router = useRouter();

  const fetchLoggedUser = async (logedId: string) => {
    const res = await fetch(`http://localhost:3000/api/login/${logedId}`);
    if (!res.ok) {
      console.log("Алдаа гарлаа:", res.status);
      return;
    }
    const data = await res.json();
    setLogedUser(data.user);
  };

  const getData = async () => {
    setLoading(false);
    const res = await fetch(`http://localhost:3000/api/login`);
    if (!res.ok) {
      console.log("Алдаа гарлаа:", res.status);
      return;
    }
    const data = await res.json();
    setUsers(data.users);
    setLoading(true);
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
      toast.error(data.error);
    } else {
      setLogedUser(data.user);
      const logedId = data.user.id;
      fetchLoggedUser(logedId);
      localStorage.setItem("loged_id", data.user.id);
      if (!data.user.profile) {
        router.push("/createAccount");
      } else {
        router.push("/");
      }
    }
    getData();
  };

  const changePassword = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.message);
    } else {
      toast.success("amjilttai soligdloo");
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
        toast.error(data.message);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("JSON-ийг унших үед алдаа гарсан:", error);
    }
    getData();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const logedId = localStorage.getItem("loged_id");
      if (logedId) {
        fetchLoggedUser(logedId);
      }
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const AUTH_PATHS = ["/login", "/sign-up"];

    if (AUTH_PATHS.includes(pathname)) return;

    if (!loading) return;

    if (!logedUser) navigateToPath("/login");
  }, [pathname, logedUser, loading]);

  if (!loading)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Loading />
      </div>
    );

  const logoutHandler = () => {
    router.push("/login");
    localStorage.clear();
    setLogedUser(null);
  };

  return (
    <userContext.Provider
      value={{
        loginUser,
        users,
        logedUser,
        logoutHandler,
        signUp,
        changePassword,
        getData,
      }}
    >
      <Toaster position="top-center" richColors />
      {children}
    </userContext.Provider>
  );
};

export default UsersProvider;
