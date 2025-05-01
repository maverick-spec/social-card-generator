
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";

type AuthContextType = {
  isAuthenticated: boolean;
  userId: string | null;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userId: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId, isSignedIn } = useClerkAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!isSignedIn);
  }, [isSignedIn]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId: userId || null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
