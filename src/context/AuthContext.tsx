
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth as useClerkAuth, useUser, useClerk } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
  user: any; // Using any for simplicity, but you could define a proper User type
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  userId: null,
  user: null,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId, isSignedIn, isLoaded } = useClerkAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<Error | null>(null);

  useEffect(() => {
    setIsAuthenticated(!!isSignedIn);
    
    // Reset any authentication errors when auth state changes
    if (isSignedIn) {
      setAuthError(null);
    }
  }, [isSignedIn]);

  // Sync user data from Clerk to Supabase when the user signs in
  useEffect(() => {
    const syncUserToSupabase = async () => {
      if (isSignedIn && user) {
        try {
          const { data, error } = await supabase
            .from('users')
            .upsert({
              id: userId,
              email: user.primaryEmailAddress?.emailAddress || '',
              first_name: user.firstName || '',
              last_name: user.lastName || '',
              image_url: user.imageUrl || '',
              last_sign_in: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'id'
            });
            
          if (error) {
            console.error('Error syncing user data with Supabase:', error);
            setAuthError(new Error(error.message));
          } else {
            console.log('User data synced with Supabase');
          }
        } catch (error) {
          const err = error as Error;
          console.error('Error syncing user data with Supabase:', err);
          setAuthError(err);
          
          toast({
            title: "User Sync Error",
            description: "There was an issue syncing your profile. Some features may be limited.",
            variant: "destructive",
            duration: 5000,
          });
        }
      }
    };

    syncUserToSupabase();
  }, [isSignedIn, user, userId]);

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign Out Error",
        description: "There was an issue signing you out. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading: !isLoaded, 
      userId: userId || null, 
      user,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
