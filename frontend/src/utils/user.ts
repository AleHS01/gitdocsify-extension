import { User } from "../types/user";

export const createUserData = (session: any): User => {
  return {
    id: session.user.id,
    email: session.user.email || "",
    avatar_url: session.user.user_metadata?.avatar_url || "",
    full_name: session.user.user_metadata?.full_name || "",
    user_name: session.user.user_metadata?.user_name || "",
    access_token: session.provider_token || "",
    refresh_token: session.provider_refresh_token || "",
  };
};
