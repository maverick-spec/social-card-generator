
import { Facebook, Twitter, Instagram, Linkedin, Github, Hexagon } from "lucide-react";
import { Footer } from "@/components/ui/footer";
import { Link } from "react-router-dom";

export function CustomFooter() {
  return (
    <Footer
      logo={<span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">NexCard</span>}
      brandName=""
      socialLinks={[
        {
          icon: <Twitter className="h-5 w-5" />,
          href: "#",
          label: "Twitter",
        },
        {
          icon: <Facebook className="h-5 w-5" />,
          href: "#",
          label: "Facebook",
        },
        {
          icon: <Instagram className="h-5 w-5" />,
          href: "#",
          label: "Instagram",
        },
        {
          icon: <Linkedin className="h-5 w-5" />,
          href: "#",
          label: "LinkedIn",
        },
        {
          icon: <Github className="h-5 w-5" />,
          href: "#",
          label: "GitHub",
        },
      ]}
      mainLinks={[
        { href: "/product", label: "Product" },
        { href: "/features", label: "Features" },
        { href: "/templates", label: "Templates" },
        { href: "/pricing", label: "Pricing" },
        { href: "/blog", label: "Blog" },
      ]}
      legalLinks={[
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy" },
      ]}
      copyright={{
        text: `© ${new Date().getFullYear()} NexCard. All rights reserved.`,
      }}
    />
  );
}
