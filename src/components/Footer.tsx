
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Footer as CustomFooter } from "@/components/ui/footer";

export function Footer() {
  // Logo component to reuse in the footer
  const Logo = () => {
    return (
      <img 
        src="/lovable-uploads/910a11a0-c287-46cf-a3ad-4ec672b86603.png" 
        alt="NexCard Logo" 
        className="h-10 w-auto"
      />
    );
  };

  return (
    <CustomFooter
      logo={<Logo />}
      brandName="NexCard"
      socialLinks={[
        {
          icon: <Facebook className="h-5 w-5" />,
          href: "https://facebook.com",
          label: "Facebook",
        },
        {
          icon: <Twitter className="h-5 w-5" />,
          href: "https://twitter.com",
          label: "Twitter",
        },
        {
          icon: <Instagram className="h-5 w-5" />,
          href: "https://instagram.com",
          label: "Instagram",
        },
        {
          icon: <Linkedin className="h-5 w-5" />,
          href: "https://linkedin.com",
          label: "LinkedIn",
        },
        {
          icon: <Github className="h-5 w-5" />,
          href: "https://github.com",
          label: "GitHub",
        },
      ]}
      mainLinks={[
        { href: "/product", label: "Product" },
        { href: "/features", label: "Features" },
        { href: "/templates", label: "Templates" },
        { href: "/pricing", label: "Pricing" },
      ]}
      legalLinks={[
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ]}
      copyright={{
        text: `© ${new Date().getFullYear()} NexCard`,
        license: "All rights reserved",
      }}
    />
  );
}
