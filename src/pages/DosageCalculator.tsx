
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DosageCalculator from "@/components/calculator/DosageCalculator";

const DosageCalculatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Pediatric Dosage Calculator</h1>
            <p className="text-muted-foreground">
              Calculate precise medication dosages based on patient weight to ensure safe and accurate administration.
            </p>
          </div>
          
          <div className="flex justify-center">
            <DosageCalculator />
          </div>
          
          <div className="max-w-2xl mx-auto mt-16 p-6 bg-accent/30 rounded-xl">
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DosageCalculatorPage;
