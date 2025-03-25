
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'dark';
  blur?: 'sm' | 'md' | 'lg';
  intensity?: 'low' | 'medium' | 'high';
  border?: boolean;
  hover?: boolean;
}

const Glass = React.forwardRef<HTMLDivElement, GlassProps>(
  ({ className, variant = 'default', blur = 'md', intensity = 'medium', border = true, hover = false, ...props }, ref) => {
    const variants = {
      default: 'bg-white/10 backdrop-blur-md border-white/20',
      card: 'bg-white/80 backdrop-blur-md border-white/30',
      dark: 'bg-black/10 backdrop-blur-md border-black/10',
    };

    const blurs = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
    };

    const intensities = {
      low: variant === 'default' ? 'bg-white/5' : variant === 'card' ? 'bg-white/60' : 'bg-black/5',
      medium: variant === 'default' ? 'bg-white/10' : variant === 'card' ? 'bg-white/80' : 'bg-black/10',
      high: variant === 'default' ? 'bg-white/20' : variant === 'card' ? 'bg-white/90' : 'bg-black/20',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl shadow-lg transition-all duration-300',
          intensities[intensity],
          blurs[blur],
          border ? `border ${variants[variant].split(' ').find(c => c.startsWith('border-'))}` : '',
          hover ? 'hover:shadow-xl hover:scale-[1.01] hover:border-white/40' : '',
          className
        )}
        {...props}
      />
    );
  }
);

Glass.displayName = 'Glass';

export { Glass };
