
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export interface Medication {
  id: string;
  name: string;
  dosageMin: number;
  dosageMax: number;
  dosageUnit: string;
  frequency: string;
  route: string;
  notes?: string;
  category: string;
}

// Sample pediatric medications 
const medications: Medication[] = [
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    dosageMin: 40,
    dosageMax: 90,
    dosageUnit: "mg/kg/day",
    frequency: "divided q8h",
    route: "Oral",
    notes: "For mild to moderate infections",
    category: "Antibiotics"
  },
  {
    id: "azithromycin",
    name: "Azithromycin",
    dosageMin: 10,
    dosageMax: 20,
    dosageUnit: "mg/kg/day",
    frequency: "once daily",
    route: "Oral",
    notes: "First day, then 5mg/kg/day for 4 days",
    category: "Antibiotics"
  },
  {
    id: "ceftriaxone",
    name: "Ceftriaxone",
    dosageMin: 50,
    dosageMax: 100,
    dosageUnit: "mg/kg/day",
    frequency: "divided q12-24h",
    route: "IV/IM",
    notes: "For severe infections",
    category: "Antibiotics"
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    dosageMin: 5,
    dosageMax: 10,
    dosageUnit: "mg/kg/dose",
    frequency: "q6-8h",
    route: "Oral",
    notes: "Max 40mg/kg/day",
    category: "Analgesics"
  },
  {
    id: "acetaminophen",
    name: "Acetaminophen",
    dosageMin: 10,
    dosageMax: 15,
    dosageUnit: "mg/kg/dose",
    frequency: "q4-6h",
    route: "Oral",
    notes: "Max 75mg/kg/day, not to exceed 4g/day",
    category: "Analgesics"
  },
  {
    id: "prednisolone",
    name: "Prednisolone",
    dosageMin: 1,
    dosageMax: 2,
    dosageUnit: "mg/kg/day",
    frequency: "once daily or divided",
    route: "Oral",
    notes: "For anti-inflammatory effects",
    category: "Corticosteroids"
  },
  {
    id: "albuterol",
    name: "Albuterol",
    dosageMin: 0.1,
    dosageMax: 0.15,
    dosageUnit: "mg/kg/dose",
    frequency: "q4-6h",
    route: "Nebulization",
    notes: "For acute bronchospasm",
    category: "Bronchodilators"
  },
  {
    id: "diphenhydramine",
    name: "Diphenhydramine",
    dosageMin: 1,
    dosageMax: 2,
    dosageUnit: "mg/kg/dose",
    frequency: "q6h",
    route: "Oral/IV",
    notes: "Max 50mg/dose",
    category: "Antihistamines"
  }
];

// Group medications by category
const groupedMedications = medications.reduce<Record<string, Medication[]>>(
  (groups, medication) => {
    const category = medication.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(medication);
    return groups;
  }, 
  {}
);

interface MedicationSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  onMedicationChange: (medication: Medication | undefined) => void;
}

export default function MedicationSelect({ 
  value, 
  onValueChange, 
  onMedicationChange 
}: MedicationSelectProps) {
  const handleChange = (newValue: string) => {
    onValueChange(newValue);
    const selectedMedication = medications.find(med => med.id === newValue);
    onMedicationChange(selectedMedication);
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select medication" />
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        {Object.entries(groupedMedications).map(([category, meds]) => (
          <SelectGroup key={category}>
            <SelectLabel>{category}</SelectLabel>
            {meds.map(med => (
              <SelectItem 
                key={med.id} 
                value={med.id}
                className="py-3"
              >
                {med.name}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
