
import { useState, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CalculatorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  error?: string;
  className?: string;
}

const CalculatorInput = forwardRef<HTMLInputElement, CalculatorInputProps>(
  ({ label, unit, error, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    
    return (
      <div className={cn("relative", className)}>
        <div className={cn(
          "transition-all duration-200 rounded-lg border",
          focused ? "ring-2 ring-primary/20 border-primary/30" : "border-input",
          error ? "border-destructive ring-destructive/20" : ""
        )}>
          <div className="flex flex-col px-3 pt-2">
            <Label 
              htmlFor={props.id} 
              className={cn(
                "text-xs text-muted-foreground mb-1 transition-colors",
                focused ? "text-primary" : "",
                error ? "text-destructive" : ""
              )}
            >
              {label}
            </Label>
            
            <div className="flex items-center">
              <Input
                ref={ref}
                className={cn(
                  "border-0 shadow-none p-0 h-8 text-base focus-visible:ring-0 focus-visible:ring-offset-0",
                  error ? "text-destructive" : ""
                )}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
              />
              
              {unit && (
                <div className="pl-2 text-sm text-muted-foreground whitespace-nowrap min-w-10">
                  {unit}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {error && (
          <div className="text-xs text-destructive mt-1 animate-slide-up-fade">
            {error}
          </div>
        )}
      </div>
    );
  }
);

CalculatorInput.displayName = "CalculatorInput";

export default CalculatorInput;
