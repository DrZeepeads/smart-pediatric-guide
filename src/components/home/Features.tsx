
import { Link } from "react-router-dom";
import { CardHover, CardHoverIcon, CardHoverTitle, CardHoverDescription } from "@/components/ui/card-hover";
import { Calculator, LineChart, MessageSquare, Wifi, AlertTriangle } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Calculator className="h-6 w-6 text-primary" />,
      title: "Drug Dosage Calculator",
      description: "Quickly calculate accurate medication dosages based on patient weight with built-in safety checks.",
      link: "/dosage-calculator"
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      title: "Growth Charts",
      description: "Track and visualize pediatric development with interactive WHO and CDC standard growth charts.",
      link: "/growth-charts"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "AI Assistant",
      description: "Get evidence-based answers to clinical questions derived from the Nelson Textbook of Pediatrics.",
      link: "/ai-assistant"
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
      title: "Emergency Guidelines",
      description: "Quick reference emergency pediatric protocols available offline when you need them most.",
      link: "/emergency"
    },
    {
      icon: <Wifi className="h-6 w-6 text-primary" />,
      title: "Offline Access",
      description: "Access critical information and tools even without internet connection.",
      link: "/"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Essential Tools for Pediatric Care</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nelson-GPT combines AI-powered information retrieval with practical clinical tools designed for healthcare professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className="block outline-none focus:ring-2 focus:ring-primary/20 rounded-2xl">
              <CardHover className="h-full transition-all duration-300 hover:translate-y-[-8px]">
                <CardHoverIcon>
                  {feature.icon}
                </CardHoverIcon>
                <CardHoverTitle>
                  {feature.title}
                </CardHoverTitle>
                <CardHoverDescription>
                  {feature.description}
                </CardHoverDescription>
              </CardHover>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
