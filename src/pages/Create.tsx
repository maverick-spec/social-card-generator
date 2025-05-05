
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialCardForm } from "@/components/SocialCardForm";
import { SocialCardPreview } from "@/components/SocialCardPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { SocialCardData } from "@/types/social-card";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

// Default empty card data
const defaultCardData: SocialCardData = {
  name: "",
  title: "",
  phone: "",
  email: "",
  twitter: "",
  linkedin: "",
  github: "",
  portfolio: "",
  photoUrl: "",
  about: "",
  interests: "",
  gradient: "dark",
};

const Create = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateId = searchParams.get('template') || 'classic';
  
  const [cardData, setCardData] = useState<SocialCardData>(defaultCardData);
  const [activeTab, setActiveTab] = useState("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingShareLink, setIsGeneratingShareLink] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  
  // Pre-fill with user email if available
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setCardData(prev => ({
        ...prev,
        email: user.primaryEmailAddress.emailAddress
      }));
    }
  }, [user]);

  const handleDataUpdate = (data: SocialCardData) => {
    setCardData(data);
  };

  const handleSaveCard = async () => {
    try {
      setIsSaving(true);
      
      if (!isAuthenticated || !user?.id) {
        toast({
          title: "Authentication required",
          description: "Please sign in to save your card",
          variant: "destructive",
        });
        return;
      }

      if (!cardData.name) {
        toast({
          title: "Name is required",
          description: "Please enter your name to save the card",
          variant: "destructive",
        });
        return;
      }

      // Insert into the cards table
      const { data, error } = await supabase
        .from('cards')
        .insert({
          user_id: user.id,
          name: cardData.name || "",
          title: cardData.title,
          email: cardData.email,
          phone: cardData.phone,
          github_url: cardData.github,
          twitter_url: cardData.twitter,
          linkedin_url: cardData.linkedin,
          website: cardData.portfolio,
          photo_url: cardData.photoUrl,
          about: cardData.about,
          interests: cardData.interests,
          gradient: cardData.gradient,
          template_id: templateId
        })
        .select();
      
      if (error) {
        console.error('Error saving card:', error);
        throw error;
      }
      
      toast({
        title: "Card saved!",
        description: "Your card has been saved successfully.",
      });
      
      // Navigate to saved cards page after successful save
      navigate('/saved-cards');
    } catch (error) {
      console.error('Error saving card:', error);
      toast({
        title: "Error saving card",
        description: "There was a problem saving your card. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Generate a share link
  const handleGenerateShareLink = async () => {
    try {
      setIsGeneratingShareLink(true);
      
      if (!cardData.name) {
        toast({
          title: "Name is required",
          description: "Please enter your name to generate a share link",
          variant: "destructive",
        });
        return;
      }
      
      const cardId = uuidv4();
      const shareableUrl = `${window.location.origin}/share/${cardId}`;
      
      // First check if user is authenticated for saving purposes
      if (isAuthenticated && user?.id) {
        // Save the card to database with the generated ID
        const { error } = await supabase
          .from('cards')
          .insert({
            id: cardId,
            user_id: user.id,
            name: cardData.name || "",
            title: cardData.title,
            email: cardData.email,
            phone: cardData.phone,
            github_url: cardData.github,
            twitter_url: cardData.twitter,
            linkedin_url: cardData.linkedin,
            website: cardData.portfolio,
            photo_url: cardData.photoUrl,
            about: cardData.about,
            interests: cardData.interests,
            gradient: cardData.gradient,
            template_id: templateId
          });
          
        if (error) {
          throw error;
        }
      } else {
        // If not authenticated, we'll just create a shareable link without saving
        toast({
          title: "Not logged in",
          description: "Your card will be available via this link but won't be saved to your account.",
        });
      }
      
      // Set the share link state
      setShareLink(shareableUrl);
      
      // Copy to clipboard 
      await navigator.clipboard.writeText(shareableUrl);
      toast({
        title: "Share link generated!",
        description: "Link has been copied to clipboard.",
      });
      
    } catch (error) {
      console.error('Error generating share link:', error);
      toast({
        title: "Error generating link",
        description: "There was a problem creating your share link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingShareLink(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/90">
        <Header />
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/90">
      <Header />
      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">Create Your Social Card</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fill in your details to generate a professional social card that you can share online
            </p>
          </motion.div>
          
          {/* Mobile Tabs (only show on small screens) */}
          <div className="md:hidden mb-8">
            <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="mt-6">
                <SocialCardForm onUpdate={handleDataUpdate} initialData={cardData} />
                <div className="mt-6 flex flex-col gap-3">
                  <Button onClick={handleSaveCard} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Card"}
                  </Button>
                  <Button onClick={handleGenerateShareLink} variant="outline" disabled={isGeneratingShareLink}>
                    {isGeneratingShareLink ? "Generating..." : "Generate Share Link"}
                  </Button>
                  {shareLink && (
                    <div className="mt-2 p-3 bg-muted rounded-md">
                      <p className="text-sm font-medium">Your share link:</p>
                      <p className="text-xs break-all">{shareLink}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="preview" className="mt-6">
                <SocialCardPreview data={cardData} template={templateId} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Desktop view (side by side) */}
          <div className="hidden md:grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Edit Details</h2>
              <SocialCardForm onUpdate={handleDataUpdate} initialData={cardData} />
              <div className="mt-6 flex flex-col gap-3">
                <Button onClick={handleSaveCard} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Card"}
                </Button>
                <Button onClick={handleGenerateShareLink} variant="outline" disabled={isGeneratingShareLink}>
                  {isGeneratingShareLink ? "Generating..." : "Generate Share Link"}
                </Button>
                {shareLink && (
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">Your share link:</p>
                    <p className="text-xs break-all">{shareLink}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Preview</h2>
              <Tabs defaultValue={templateId}>
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="classic">Classic</TabsTrigger>
                  <TabsTrigger value="modern">Modern</TabsTrigger>
                </TabsList>
                <TabsContent value="classic">
                  <SocialCardPreview data={cardData} template="classic" />
                </TabsContent>
                <TabsContent value="modern">
                  <SocialCardPreview data={cardData} template="modern" />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Create;
