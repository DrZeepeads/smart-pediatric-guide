
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Heart, Lungs, Thermometer, Stethoscope } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmergencyGuidelines() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-red-500 text-white">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6" />
          <CardTitle>Pediatric Emergency Guidelines</CardTitle>
        </div>
        <CardDescription className="text-white/90">
          Quick reference for common pediatric emergencies (available offline)
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="resuscitation">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            {[
              { id: "resuscitation", icon: <Heart className="h-4 w-4 mr-1" />, label: "Resuscitation" },
              { id: "respiratory", icon: <Lungs className="h-4 w-4 mr-1" />, label: "Respiratory" },
              { id: "fever", icon: <Thermometer className="h-4 w-4 mr-1" />, label: "Fever" },
              { id: "seizure", icon: <Stethoscope className="h-4 w-4 mr-1" />, label: "Seizure" }
            ].map(tab => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id}
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
              >
                <div className="flex items-center">
                  {tab.icon}
                  {tab.label}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="resuscitation" className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">Pediatric Basic Life Support</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Check responsiveness and call for help</li>
              <li>Open airway (head-tilt, chin-lift)</li>
              <li>Check breathing (look, listen, feel for 10 seconds)</li>
              <li>If not breathing, give 2 rescue breaths</li>
              <li>Check pulse (brachial in infant, carotid in child)</li>
              <li>If no pulse, begin chest compressions:
                <ul className="list-disc pl-5 pt-1">
                  <li>Rate: 100-120/min</li>
                  <li>Depth: ⅓ of chest depth (approximately 4 cm in infants, 5 cm in children)</li>
                  <li>Ratio: 30:2 (single rescuer), 15:2 (two healthcare rescuers)</li>
                </ul>
              </li>
            </ol>
            
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-yellow-800">Weight-based Epinephrine dosing: 0.01 mg/kg (0.1 mL/kg of 1:10,000 solution)</p>
            </div>
          </TabsContent>
          
          <TabsContent value="respiratory" className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">Respiratory Distress Management</h3>
            <ul className="space-y-3">
              <li className="p-3 border rounded-lg">
                <p className="font-medium">Asthma/Bronchospasm</p>
                <p className="text-sm text-muted-foreground">Albuterol 2.5-5 mg nebulized, may repeat q20min × 3</p>
              </li>
              <li className="p-3 border rounded-lg">
                <p className="font-medium">Croup</p>
                <p className="text-sm text-muted-foreground">Dexamethasone 0.6 mg/kg PO/IM/IV (max 16 mg)</p>
              </li>
              <li className="p-3 border rounded-lg">
                <p className="font-medium">Bronchiolitis</p>
                <p className="text-sm text-muted-foreground">Supportive care, nasal suctioning, oxygen as needed</p>
              </li>
              <li className="p-3 border rounded-lg">
                <p className="font-medium">Anaphylaxis</p>
                <p className="text-sm text-muted-foreground">Epinephrine 0.01 mg/kg IM (max 0.3 mg)</p>
              </li>
            </ul>
          </TabsContent>
          
          <TabsContent value="fever" className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">Fever Management</h3>
            <div className="space-y-3">
              <div className="bg-secondary/50 p-3 rounded-lg">
                <h4 className="font-medium">Antipyretic Dosing</h4>
                <ul className="text-sm space-y-1 mt-1">
                  <li>Acetaminophen: 15 mg/kg q4-6h (max 75 mg/kg/day)</li>
                  <li>Ibuprofen: 10 mg/kg q6-8h (max 40 mg/kg/day)</li>
                </ul>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium">Assessment for Serious Bacterial Infection</h4>
                <ul className="text-sm space-y-1 mt-1">
                  <li>0-28 days: Full sepsis workup for temp ≥38°C</li>
                  <li>29-90 days: Consider Rochester/Philadelphia/Boston criteria</li>
                  <li>3-36 months: Assess using clinical appearance and lab markers</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seizure" className="p-4 space-y-4">
            <h3 className="text-lg font-semibold">Seizure Management</h3>
            <div className="space-y-3">
              <ol className="list-decimal pl-5 space-y-2">
                <li>Protect airway, position on side if possible</li>
                <li>Administer benzodiazepine if seizure >5 min:
                  <ul className="list-disc pl-5 pt-1 text-sm">
                    <li>Midazolam 0.2 mg/kg IN/IM (max 10 mg)</li>
                    <li>Lorazepam 0.1 mg/kg IV (max 4 mg)</li>
                    <li>Diazepam 0.5 mg/kg PR (max 20 mg)</li>
                  </ul>
                </li>
                <li>If persistent after 5 more min, give second-line agent:
                  <ul className="list-disc pl-5 pt-1 text-sm">
                    <li>Fosphenytoin/Phenytoin 20 mg PE/kg IV</li>
                    <li>Valproic acid 40 mg/kg IV</li>
                    <li>Levetiracetam 60 mg/kg IV</li>
                  </ul>
                </li>
              </ol>
              
              <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <p className="text-sm text-red-800">Status epilepticus requires immediate intervention. Consider PICU if seizures continue despite two medication attempts.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
