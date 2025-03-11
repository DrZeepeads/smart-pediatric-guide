
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CalculatorInput from "./CalculatorInput";
import MedicationSelect, { Medication } from "./MedicationSelect";
import { toast } from "sonner";
import { Info, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CalculationResult {
  minDose: number;
  maxDose: number;
  doseUnit: string;
  minDailyDose?: number;
  maxDailyDose?: number;
  frequency: string;
  route: string;
}

export default function DosageCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [weightError, setWeightError] = useState<string>("");
  const [selectedMedicationId, setSelectedMedicationId] = useState<string>("");
  const [selectedMedication, setSelectedMedication] = useState<Medication>();
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const validateWeight = (value: string): boolean => {
    if (!value) {
      setWeightError("Weight is required");
      return false;
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setWeightError("Weight must be a number");
      return false;
    }
    
    if (numValue <= 0) {
      setWeightError("Weight must be greater than 0");
      return false;
    }
    
    if (numValue > 250) {
      setWeightError("Weight seems too high. Please check");
      return false;
    }
    
    setWeightError("");
    return true;
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWeight(value);
    if (value) validateWeight(value);
  };

  const handleMedicationChange = (medication: Medication | undefined) => {
    setSelectedMedication(medication);
    // Reset calculation when medication changes
    setCalculationResult(null);
  };

  const calculateDosage = () => {
    // Validate inputs
    if (!validateWeight(weight) || !selectedMedication) {
      if (!selectedMedication) {
        toast.error("Please select a medication", {
          icon: <AlertCircle className="h-5 w-5" />,
        });
      }
      return;
    }
    
    // Simulate calculation process
    setIsCalculating(true);
    
    setTimeout(() => {
      try {
        const weightKg = parseFloat(weight);
        
        // Calculate single dose if unit contains "dose"
        if (selectedMedication.dosageUnit.includes("dose")) {
          const minDose = parseFloat((selectedMedication.dosageMin * weightKg).toFixed(2));
          const maxDose = parseFloat((selectedMedication.dosageMax * weightKg).toFixed(2));
          
          setCalculationResult({
            minDose,
            maxDose,
            doseUnit: selectedMedication.dosageUnit.replace("kg/", ""),
            frequency: selectedMedication.frequency,
            route: selectedMedication.route,
          });
        } 
        // Calculate daily dose if unit contains "day"
        else if (selectedMedication.dosageUnit.includes("day")) {
          const minDailyDose = parseFloat((selectedMedication.dosageMin * weightKg).toFixed(2));
          const maxDailyDose = parseFloat((selectedMedication.dosageMax * weightKg).toFixed(2));
          
          // Estimate single dose based on frequency
          let divisor = 1;
          if (selectedMedication.frequency.includes("q8h") || selectedMedication.frequency.includes("tid")) {
            divisor = 3;
          } else if (selectedMedication.frequency.includes("q12h") || selectedMedication.frequency.includes("bid")) {
            divisor = 2;
          } else if (selectedMedication.frequency.includes("q6h")) {
            divisor = 4;
          }
          
          const minDose = parseFloat((minDailyDose / divisor).toFixed(2));
          const maxDose = parseFloat((maxDailyDose / divisor).toFixed(2));
          
          setCalculationResult({
            minDose,
            maxDose,
            minDailyDose,
            maxDailyDose,
            doseUnit: selectedMedication.dosageUnit.replace("kg/", ""),
            frequency: selectedMedication.frequency,
            route: selectedMedication.route,
          });
        }
        
        toast.success("Dosage calculated successfully", {
          icon: <CheckCircle className="h-5 w-5" />,
        });
      } catch (error) {
        console.error("Calculation error:", error);
        toast.error("Error calculating dosage", {
          icon: <AlertCircle className="h-5 w-5" />,
        });
      } finally {
        setIsCalculating(false);
      }
    }, 800); // Simulate calculation time
  };

  const resetCalculator = () => {
    setWeight("");
    setWeightError("");
    setSelectedMedicationId("");
    setSelectedMedication(undefined);
    setCalculationResult(null);
    toast("Calculator reset", {
      icon: <RefreshCw className="h-5 w-5" />,
    });
  };

  return (
    <Card className="w-full max-w-xl shadow-glass animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl">Pediatric Dosage Calculator</CardTitle>
        <CardDescription>
          Calculate medication dosages based on patient weight
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium">
              Patient Weight
            </label>
          </div>
          <CalculatorInput
            label="Weight"
            unit="kg"
            error={weightError}
            value={weight}
            onChange={handleWeightChange}
            id="patient-weight"
            placeholder="Enter weight"
            type="number"
            step="0.1"
            min="0"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium">
              Medication
            </label>
          </div>
          <MedicationSelect
            value={selectedMedicationId}
            onValueChange={setSelectedMedicationId}
            onMedicationChange={handleMedicationChange}
          />
          
          {selectedMedication && (
            <div className="mt-3 p-3 bg-accent/50 rounded-lg animate-fade-in">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{selectedMedication.name}</span>
                <span className="text-xs px-2 py-0.5 bg-accent rounded-full">
                  {selectedMedication.category}
                </span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Standard Dosage:</span>
                  <span className="font-medium">
                    {selectedMedication.dosageMin}-{selectedMedication.dosageMax} {selectedMedication.dosageUnit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <span>{selectedMedication.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Route:</span>
                  <span>{selectedMedication.route}</span>
                </div>
                
                {selectedMedication.notes && (
                  <div className="mt-2 flex items-start gap-1 text-xs">
                    <Info className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{selectedMedication.notes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {calculationResult && (
          <div className="mt-6 animate-fade-up">
            <Separator className="mb-4" />
            <h3 className="font-medium mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Calculated Dosage
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center bg-accent/30 p-3 rounded-lg">
                <span className="font-medium">Per Dose Range:</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="font-bold text-base">
                      {calculationResult.minDose} - {calculationResult.maxDose} {calculationResult.doseUnit.replace("day", "dose")}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Recommended dose range based on patient weight</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {(calculationResult.minDailyDose !== undefined && calculationResult.maxDailyDose !== undefined) && (
                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                  <span>Total Daily Dose:</span>
                  <span className="font-medium">
                    {calculationResult.minDailyDose} - {calculationResult.maxDailyDose} {calculationResult.doseUnit}
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col p-3 rounded-lg bg-secondary/30">
                  <span className="text-xs text-muted-foreground">Frequency</span>
                  <span>{calculationResult.frequency}</span>
                </div>
                
                <div className="flex flex-col p-3 rounded-lg bg-secondary/30">
                  <span className="text-xs text-muted-foreground">Route</span>
                  <span>{calculationResult.route}</span>
                </div>
              </div>
              
              <div className="bg-accent/20 p-3 rounded-lg text-xs mt-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p>
                  Always verify dosage calculations. This calculator is intended as a reference tool only.
                  Consult appropriate references for complete dosing information.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline"
          onClick={resetCalculator}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reset
        </Button>
        
        <Button 
          onClick={calculateDosage}
          disabled={isCalculating}
          className="min-w-32"
        >
          {isCalculating ? (
            <span className="flex items-center">
              <span className="loading-dot mx-0.5 h-1.5 w-1.5 rounded-full bg-white" />
              <span className="loading-dot mx-0.5 h-1.5 w-1.5 rounded-full bg-white" />
              <span className="loading-dot mx-0.5 h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          ) : (
            'Calculate Dosage'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
