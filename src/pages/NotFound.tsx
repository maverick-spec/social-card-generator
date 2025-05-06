
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this is a Clerk-related error
    if (location.pathname.includes("clerk") || 
        location.search.includes("clerk") || 
        location.pathname.includes("callback")) {
      
      console.error("Authentication related 404 error detected:", location);
      
      toast({
        title: "Authentication Error",
        description: "There was a problem with authentication. Redirecting you to login page.",
        variant: "destructive",
      });
      
      // Redirect to login after a brief delay
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-medium text-foreground mb-2">Page not found</p>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link to="/" className="flex items-center justify-center">
              <Home className="w-4 h-4 mr-2" /> Return to Home
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="w-full">
            <Link to="/login" className="flex items-center justify-center">
              Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
