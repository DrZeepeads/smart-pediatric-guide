
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardHoverProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function CardHover({ children, className, onClick }: CardHoverProps) {
  return (
    <div 
      className={cn(
        "card-hover bg-card rounded-2xl border border-border/40 p-6 shadow-subtle",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHoverIconProps {
  children: ReactNode;
  className?: string;
}

export function CardHoverIcon({ children, className }: CardHoverIconProps) {
  return (
    <div className={cn(
      "w-12 h-12 flex items-center justify-center rounded-full bg-accent mb-4",
      className
    )}>
      {children}
    </div>
  );
}

interface CardHoverTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardHoverTitle({ children, className }: CardHoverTitleProps) {
  return (
    <h3 className={cn("text-lg font-medium mb-2", className)}>
      {children}
    </h3>
  );
}

interface CardHoverDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardHoverDescription({ children, className }: CardHoverDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}
