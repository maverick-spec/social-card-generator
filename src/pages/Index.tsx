
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StepsSection } from "@/components/StepsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StepsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
