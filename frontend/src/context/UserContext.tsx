import React, { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching user:", error.message);
      }
      const user = session?.user;
      console.log(session?.access_token);
      if (user) {
        const userData: User = {
          id: user.id,
          email: user.email || "",
          avatar_url: user.user_metadata?.avatar_url || "",
          full_name: user.user_metadata?.full_name || "",
          user_name: user.user_metadata?.user_name || "",
          access_token: session?.provider_token || "",
          refresh_token: session?.provider_refresh_token || "",
        };
        setUser(userData);
      }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || "",
            avatar_url: session.user.user_metadata?.avatar_url || "",
            full_name: session.user.user_metadata?.full_name || "",
            user_name: session.user.user_metadata?.user_name || "",
            access_token: session?.provider_token || "",
            refresh_token: session?.provider_refresh_token || "",
          };
          setUser(userData);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
