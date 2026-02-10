"use client";

import { authClient } from "@/lib/auth-client";
import { IUser } from "@/types/user.types";
import * as React from "react";


interface AuthContextType {
  user: IUser | null;
  session: object | null;
  isPending: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  session: null,
  isPending: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession();

  return (
    <AuthContext.Provider
      value={{
        user: (data?.user as IUser) ?? null,
        session: data?.session ?? null,
        isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
