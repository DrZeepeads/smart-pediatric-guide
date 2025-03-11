
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/60 backdrop-blur-sm mb-8 animate-fade-up">
            <span className="text-xs font-medium text-primary">
              Digital companion to the Nelson Textbook of Pediatrics
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Clinical decision support for pediatric care
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
            Nelson-GPT provides healthcare professionals with reliable, evidence-based information and tools for pediatric patient care.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Link to="/dosage-calculator">
              <Button size="lg" className="w-full sm:w-auto group">
                Try Dosage Calculator
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/ai-assistant">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Abstract shapes */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl opacity-50 animate-subtle-pulse" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl opacity-50 animate-subtle-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute -bottom-40 left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-subtle-pulse" style={{ animationDelay: "2s" }} />
    </section>
  );
}
