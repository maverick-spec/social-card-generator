
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import {
    Upload,
    Edit,
    Share2, 
    CheckCircle
} from "lucide-react";

const items: BentoItem[] = [
    {
        title: "Upload Your Photo",
        meta: "Step 1",
        description: "Choose your professional profile picture and upload it to your social card.",
        icon: <Upload className="w-4 h-4 text-primary" />,
        status: "Easy",
        tags: ["Photo", "Upload"],
        colSpan: 1,
        hasPersistentHover: true,
    },
    {
        title: "Add Your Details",
        meta: "Step 2",
        description: "Fill in your contact information and links to your professional profiles.",
        icon: <Edit className="w-4 h-4 text-primary" />,
        status: "Simple",
        tags: ["Details", "Information"],
        colSpan: 1,
    },
    {
        title: "Share or Download",
        meta: "Step 3",
        description: "Generate a shareable link or download your social card as PNG or JPG.",
        icon: <Share2 className="w-4 h-4 text-primary" />,
        status: "Instant",
        tags: ["Share", "Download"],
        colSpan: 1,
    },
    {
        title: "Make Connections",
        meta: "Step 4",
        description: "Start sharing your card with potential connections and expand your network.",
        icon: <CheckCircle className="w-4 h-4 text-primary" />,
        status: "Results",
        tags: ["Network", "Connect"],
        colSpan: 3,
        hasPersistentHover: true,
    }
];

export function BentoGridDemo() {
    return (
        <div className="py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 mb-10 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Create your professional social card in three simple steps
                </p>
            </div>
            <BentoGrid items={items} />
        </div>
    );
}
