
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loader = ({ size = 'md', className }: LoaderProps) => {
  const sizeClass = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={cn(
          "border-t-web3-blue rounded-full animate-spin", 
          sizeClass[size],
          className
        )}
      />
    </div>
  );
};
