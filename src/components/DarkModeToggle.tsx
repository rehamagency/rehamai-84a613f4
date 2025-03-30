import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

type DarkModeToggleProps = {
  variant?: 'button' | 'toggle' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const DarkModeToggle = ({ 
  variant = 'button', 
  size = 'md',
  className = '' 
}: DarkModeToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has a preference saved in localStorage
    const savedPreference = localStorage.getItem('darkMode');
    
    if (savedPreference !== null) {
      return savedPreference === 'true';
    }
    
    // Otherwise, check for system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to body when component mounts and when isDarkMode changes
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', String(isDarkMode));

    return () => {
      // This cleanup is needed only if the component unmounts and you want to 
      // preserve the dark mode state - otherwise it could be removed
    };
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  if (variant === 'toggle') {
    return (
      <Toggle
        pressed={isDarkMode}
        onPressedChange={toggleDarkMode}
        aria-label="Toggle dark mode"
        className={className}
      >
        {isDarkMode ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Toggle>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-full ${
          isDarkMode 
            ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' 
            : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
        } ${className}`}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun className={size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} />
        ) : (
          <Moon className={size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} />
        )}
      </button>
    );
  }

  // Default button variant
  return (
    <Button
      variant="outline"
      size={size === 'lg' ? 'default' : size === 'sm' ? 'sm' : 'sm'}
      onClick={toggleDarkMode}
      className={`${isDarkMode ? 'border-gray-700' : ''} ${className}`}
    >
      {isDarkMode ? (
        <>
          <Sun className="h-4 w-4 mr-2" />
          Light Mode
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 mr-2" />
          Dark Mode
        </>
      )}
    </Button>
  );
};

export default DarkModeToggle;
