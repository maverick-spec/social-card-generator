
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  
  const toggleDropdown = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            CardCraft
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Product Dropdown */}
          <div className="relative group">
            <button 
              className={cn(
                "nav-link flex items-center gap-1",
                (isActive("/product") || isActive("/features")) && "active"
              )}
              onClick={() => toggleDropdown("product")}
            >
              Product
              {openDropdown === "product" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {openDropdown === "product" && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-green/10 rounded-lg shadow-lg p-2 z-50">
                <Link 
                  to="/product" 
                  className="block px-4 py-2 rounded hover:bg-green/10 dark:hover:bg-hunter/10"
                  onClick={() => setOpenDropdown(null)}
                >
                  Overview
                </Link>
                <Link 
                  to="/features" 
                  className="block px-4 py-2 rounded hover:bg-green/10 dark:hover:bg-hunter/10"
                  onClick={() => setOpenDropdown(null)}
                >
                  Features
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/templates" className={cn("nav-link", isActive("/templates") && "active")}>
            Templates
          </Link>
          
          <Link to="/pricing" className={cn("nav-link", isActive("/pricing") && "active")}>
            Pricing
          </Link>
          
          {/* Resources Dropdown */}
          <div className="relative group">
            <button 
              className={cn(
                "nav-link flex items-center gap-1",
                (isActive("/resources") || isActive("/blog") || isActive("/guides") || isActive("/help")) && "active"
              )}
              onClick={() => toggleDropdown("resources")}
            >
              Resources
              {openDropdown === "resources" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {openDropdown === "resources" && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-green/10 rounded-lg shadow-lg p-2 z-50">
                <Link 
                  to="/blog" 
                  className="block px-4 py-2 rounded hover:bg-green/10 dark:hover:bg-hunter/10"
                  onClick={() => setOpenDropdown(null)}
                >
                  Blog
                </Link>
                <Link 
                  to="/guides" 
                  className="block px-4 py-2 rounded hover:bg-green/10 dark:hover:bg-hunter/10"
                  onClick={() => setOpenDropdown(null)}
                >
                  Guides
                </Link>
                <Link 
                  to="/help" 
                  className="block px-4 py-2 rounded hover:bg-green/10 dark:hover:bg-hunter/10"
                  onClick={() => setOpenDropdown(null)}
                >
                  Help Center
                </Link>
              </div>
            )}
          </div>
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
          isOpen ? "max-h-[500px] py-4 border-t border-border" : "max-h-0"
        )}
      >
        <nav className="flex flex-col space-y-4 px-4">
          {/* Product Section */}
          <div>
            <button 
              className="flex items-center justify-between w-full py-2"
              onClick={() => toggleDropdown("mobileProduct")}
            >
              <span className={cn(
                (isActive("/product") || isActive("/features")) && "text-primary font-medium"
              )}>
                Product
              </span>
              {openDropdown === "mobileProduct" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {openDropdown === "mobileProduct" && (
              <div className="pl-4 mt-2 space-y-2">
                <Link 
                  to="/product" 
                  className="block py-2"
                  onClick={() => {
                    setIsOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  Overview
                </Link>
                <Link 
                  to="/features" 
                  className="block py-2"
                  onClick={() => {
                    setIsOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  Features
                </Link>
              </div>
            )}
          </div>
          
          <Link 
            to="/templates" 
            className={cn("py-2", isActive("/templates") && "text-primary font-medium")}
            onClick={() => setIsOpen(false)}
          >
            Templates
          </Link>
          
          <Link 
            to="/pricing" 
            className={cn("py-2", isActive("/pricing") && "text-primary font-medium")}
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          
          {/* Resources Section */}
          <div>
            <button 
              className="flex items-center justify-between w-full py-2"
              onClick={() => toggleDropdown("mobileResources")}
            >
              <span className={cn(
                (isActive("/resources") || isActive("/blog") || isActive("/guides") || isActive("/help")) && "text-primary font-medium"
              )}>
                Resources
              </span>
              {openDropdown === "mobileResources" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {openDropdown === "mobileResources" && (
              <div className="pl-4 mt-2 space-y-2">
                <Link 
                  to="/blog" 
                  className="block py-2"
                  onClick={() => {
                    setIsOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  Blog
                </Link>
                <Link 
                  to="/guides" 
                  className="block py-2"
                  onClick={() => {
                    setIsOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  Guides
                </Link>
                <Link 
                  to="/help" 
                  className="block py-2"
                  onClick={() => {
                    setIsOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  Help Center
                </Link>
              </div>
            )}
          </div>
          
          {/* Company Section */}
          <div>
            <button 
              className="flex items-center justify-between w-full py-2"
              onClick={() => toggleDropdown("mobileCompany")}
            >
              <span className={cn(
                (isActive("/about") || isActive("/contact") || isActive("/privacy")) && "text-primary font-medium"
              )}>
                Company
              </span>
              {openDropdown === "mobileCompany" ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {openDropdown === "mobileCompany" && (
              <div className="pl-4 mt-2 space-y-2">
                <Link 
                  to="/about" 
                  className="block py-2"
                  onClick={() => {
                    setIsOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="block py-2"
                  onClick={() => {
                    setIsOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  Contact
                </Link>
                <Link 
                  to="/privacy" 
                  className="block py-2"
                  onClick={() => {
                    setIsOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  Privacy
                </Link>
              </div>
            )}
          </div>
          
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
