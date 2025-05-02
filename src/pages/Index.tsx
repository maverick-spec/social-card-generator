
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { VideoSection } from "@/components/VideoSection";
import { BentoGridDemo } from "@/components/blocks/BentoGridDemo";
import { CustomFooter } from "@/components/blocks/CustomFooter";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <VideoSection />
        <BentoGridDemo />
        
        {/* Features Highlight */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose NexCard?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Our platform offers the perfect blend of professional features and ease of use
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl bg-green/5 dark:bg-hunter/5 border border-green/10 dark:border-hunter/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-full bg-green/10 dark:bg-hunter/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green dark:text-hunter" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button asChild className="btn-primary">
                <Link to="/features">
                  Explore All Features <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-hunter/10 to-green/10">
          <div className="container mx-auto">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Create Your Professional Digital Identity?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of professionals who are making meaningful connections with NexCard's digital business cards.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="btn-primary min-w-[180px]">
                  <Link to="/create">Get Started for Free</Link>
                </Button>
                <Button asChild className="btn-secondary min-w-[180px]">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <CustomFooter />
    </div>
  );
};

const features = [
  {
    title: "Easy to Create",
    description: "Create your digital business card in just a few minutes with our intuitive interface."
  },
  {
    title: "Always Updated",
    description: "Changes you make are instantly reflected across all shared versions of your card."
  },
  {
    title: "Professional Design",
    description: "Choose from a variety of professionally designed templates that make a statement."
  },
  {
    title: "Instant Sharing",
    description: "Share your card via email, social media, QR code, or direct link with just one click."
  }
];

export default Index;
