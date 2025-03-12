
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DosageCalculator from "@/components/calculator/DosageCalculator";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Info, ShieldAlert, ThumbsUp } from "lucide-react";

const DosageCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-12 pb-16 px-4 container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Pediatric Dosage Calculator</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Calculate precise medication dosages based on patient weight to ensure safe and accurate administration.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <DosageCalculator />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-medium mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <ThumbsUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Easy to Use</h3>
                <p className="text-sm text-muted-foreground">
                  Simple interface for quick and accurate medication dose calculations
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Evidence-Based</h3>
                <p className="text-sm text-muted-foreground">
                  Calculations based on established pediatric dosing guidelines
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <ShieldAlert className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Safety First</h3>
                <p className="text-sm text-muted-foreground">
                  Built-in safety checks help prevent dosing errors
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-8 p-6 bg-accent/30 rounded-xl shadow-sm border-accent/50">
            <h2 className="text-xl font-medium mb-4">About the Calculator</h2>
            <p className="text-sm text-muted-foreground mb-4">
              This pediatric dosage calculator provides recommended medication dosages based on standard 
              pediatric dosing guidelines. It helps healthcare providers quickly determine appropriate 
              medication doses based on a patient's weight.
            </p>
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium">Important Notes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Always verify calculated doses with appropriate clinical references.</li>
                <li>Consider patient-specific factors that may require dosage adjustments.</li>
                <li>The calculator is a clinical decision support tool and does not replace professional judgment.</li>
                <li>For emergency situations, consult established protocols and references.</li>
              </ul>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DosageCalculatorPage;
