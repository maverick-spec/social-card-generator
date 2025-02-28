
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-pinkyWhite to-aragon bg-clip-text text-transparent">
            SocialCard
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link active">
            Home
          </Link>
          <Link to="/templates" className="nav-link">
            Social Card Templates
          </Link>
          <Link to="/blog" className="nav-link">
            Blog
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button asChild className="btn-primary">
            <Link to="/create">Get Started</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[300px] py-4 border-t border-border" : "max-h-0"
        )}
      >
        <nav className="flex flex-col space-y-4 px-4">
          <Link 
            to="/" 
            className="nav-link active py-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/templates" 
            className="nav-link py-2"
            onClick={() => setIsOpen(false)}
          >
            Social Card Templates
          </Link>
          <Link 
            to="/blog" 
            className="nav-link py-2"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Button asChild className="btn-primary w-full mt-2">
            <Link to="/create" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
