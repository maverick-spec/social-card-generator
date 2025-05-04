
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "A timeless, elegant design with a clean layout.",
    color: "from-blue-500 to-blue-700",
    previewText: "Jane Smith",
    previewSubtext: "Software Engineer"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Sleek and contemporary with bold elements.",
    color: "from-purple-500 to-purple-700",
    previewText: "Alex Johnson",
    previewSubtext: "UX Designer"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and refined with a focus on content.",
    color: "from-teal-500 to-teal-700",
    previewText: "Sam Taylor",
    previewSubtext: "Product Manager"
  },
  {
    id: "creative",
    name: "Academic",
    description: "Perfect for researchers and academic professionals.",
    color: "from-emerald-500 to-emerald-700",
    previewText: "Dr. Morgan Lee",
    previewSubtext: "Research Scientist"
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional and polished for business environments.",
    color: "from-indigo-500 to-indigo-700",
    previewText: "Jamie Wilson",
    previewSubtext: "Marketing Director"
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern and digital-focused with a tech aesthetic.",
    color: "from-cyan-500 to-cyan-700",
    previewText: "Taylor Kim",
    previewSubtext: "Lead Developer"
  }
];

const Templates = () => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Perfect Card Template</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Select from our professionally designed templates to create your ideal social card
            </p>
          </motion.div>

          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Button variant="outline" size="sm" className="rounded-full bg-primary/10 border-primary/20 hover:bg-primary/20">
              All Templates
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">Professional</Button>
            <Button variant="outline" size="sm" className="rounded-full">Creative</Button>
            <Button variant="outline" size="sm" className="rounded-full">Minimal</Button>
            <Button variant="outline" size="sm" className="rounded-full">Academic</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-border/40">
                  <div className={`h-56 bg-gradient-to-r ${template.color} flex items-center justify-center p-4`}>
                    <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-6 w-64 h-40 flex flex-col items-center justify-center transition-all duration-300 shadow-md">
                      {hoveredTemplate === template.id ? (
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-2 flex items-center justify-center text-primary font-bold">
                            {template.previewText.charAt(0)}
                          </div>
                          <p className="font-bold text-lg dark:text-white">{template.previewText}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{template.previewSubtext}</p>
                          <div className="flex justify-center space-x-2 mt-2">
                            <div className="w-5 h-5 rounded-full bg-primary/80"></div>
                            <div className="w-5 h-5 rounded-full bg-primary/60"></div>
                            <div className="w-5 h-5 rounded-full bg-primary/40"></div>
                          </div>
                        </div>
                      ) : (
                        <p className="font-bold text-xl text-primary">{template.name}</p>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                    <p className="text-muted-foreground mb-4">{template.description}</p>
                    <div className="flex space-x-3">
                      <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link to={`/create?template=${template.id}`}>Use Template</Link>
                      </Button>
                      <Button variant="outline" size="icon" className="px-4">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 4.5C5 5.32843 4.32843 6 3.5 6C2.67157 6 2 5.32843 2 4.5C2 3.67157 2.67157 3 3.5 3C4.32843 3 5 3.67157 5 4.5ZM13 4.5C13 5.32843 12.3284 6 11.5 6C10.6716 6 10 5.32843 10 4.5C10 3.67157 10.6716 3 11.5 3C12.3284 3 13 3.67157 13 4.5ZM3.5 11C4.32843 11 5 10.3284 5 9.5C5 8.67157 4.32843 8 3.5 8C2.67157 8 2 8.67157 2 9.5C2 10.3284 2.67157 11 3.5 11ZM13 9.5C13 10.3284 12.3284 11 11.5 11C10.6716 11 10 10.3284 10 9.5C10 8.67157 10.6716 8 11.5 8C12.3284 8 13 8.67157 13 9.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pro Templates Banner */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white flex flex-col md:flex-row items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Want more premium templates?</h3>
              <p className="text-white/80 max-w-md">Unlock our entire collection of professional templates with a Pro subscription.</p>
            </div>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90">
              Upgrade to Pro
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
