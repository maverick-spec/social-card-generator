
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-medium text-foreground mb-2">Page not found</p>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild size="lg">
          <Link to="/" className="flex items-center">
            <Home className="w-4 h-4 mr-2" /> Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
