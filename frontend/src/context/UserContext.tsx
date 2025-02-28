import React, { createContext, useState, useEffect, ReactNode } from "react";
import supabase from "../lib/supabase";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { createUserData } from "../utils/user";
import axiosInstance from "../utils/axios";

interface UserContextType {
  user: User | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sessionExpirationTime, setSessionExpirationTime] = useState<
    number | null
  >(null);
  const navigate = useNavigate();

  const storeTokens = async (accessToken: string, refreshToken: string) => {
    if (!accessToken && !refreshSession) {
      return;
    }

    try {
      await axiosInstance.post("http://localhost:8000/api/github/login", {
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching user:", error.message);
      }

      if (session?.user) {
        const userData: User = createUserData(session);
        setUser(userData);
        if (session.expires_at) {
          setSessionExpirationTime(session.expires_at * 1000);
        }
      }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const userData: User = createUserData(session);
          setUser(userData);
          storeTokens(
            session.provider_token || "",
            session.provider_refresh_token || ""
          );
          if (session.expires_at) {
            setSessionExpirationTime(session.expires_at * 1000);
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkSessionExpiry = () => {
      if (sessionExpirationTime) {
        const currentTime = Date.now();
        const timeLeft = sessionExpirationTime - currentTime;

        if (timeLeft < 5 * 60 * 1000) {
          refreshSession();
        }
      }
    };

    const intervalId = setInterval(checkSessionExpiry, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [sessionExpirationTime]);

  const refreshSession = async () => {
    const { data, error } = await supabase.auth.refreshSession();

    if (error) {
      console.error("Error refreshing session:", error.message);
      return;
    }

    if (data?.session) {
      const userData = createUserData(data.session);
      setUser(userData);

      if (data.session.expires_at) {
        setSessionExpirationTime(data.session.expires_at * 1000);
      }
    }
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "repo read:user project",
      },
    });

    if (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
      return;
    }

    setUser(null);
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <UserContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
