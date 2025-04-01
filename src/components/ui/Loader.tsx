
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: 'primary' | 'white';
  text?: string;
}

export const Loader = ({ 
  size = 'md', 
  className,
  color = 'primary',
  text
}: LoaderProps) => {
  const sizeClass = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const colorClass = {
    primary: 'border-t-web3-blue',
    white: 'border-t-white'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={cn(
          "border-transparent rounded-full animate-spin", 
          sizeClass[size],
          colorClass[color],
          className
        )}
      />
      {text && (
        <p className={cn(
          "mt-2 text-sm",
          color === 'white' ? "text-white" : "text-gray-500"
        )}>
          {text}
        </p>
      )}
    </div>
  );
};

// Export an alternate version using Lucide icon for more consistent styling
export const LoaderIcon = ({ 
  size = 'md', 
  className,
  color = 'primary',
  text
}: LoaderProps) => {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 36,
  };
  
  const colorClass = {
    primary: 'text-web3-blue',
    white: 'text-white'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 
        size={sizeMap[size]} 
        className={cn("animate-spin", colorClass[color], className)} 
      />
      {text && (
        <p className={cn(
          "mt-2 text-sm",
          color === 'white' ? "text-white" : "text-gray-500"
        )}>
          {text}
        </p>
      )}
    </div>
  );
};
