
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
    color: "from-blue-400 to-purple-500"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Sleek and contemporary with bold elements.",
    color: "from-pinkyWhite to-aragon"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and refined with a focus on content.",
    color: "from-gray-400 to-gray-700"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique and eye-catching for creative professionals.",
    color: "from-pink-400 to-orange-500"
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional and polished for business environments.",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern and digital-focused with a tech aesthetic.",
    color: "from-green-400 to-teal-500"
  }
];

const Templates = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Social Card Templates</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from a variety of professionally designed templates for your social card
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className={`h-48 bg-gradient-to-r ${template.color} flex items-center justify-center p-4`}>
                    <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-4 w-40 h-24 flex items-center justify-center">
                      <p className="font-syne font-bold text-lg">{template.name}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                    <p className="text-muted-foreground mb-4">{template.description}</p>
                    <Button asChild className="w-full">
                      <Link to={`/create?template=${template.id}`}>Use Template</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
