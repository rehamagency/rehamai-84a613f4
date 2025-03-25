
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const DiscordIcon: React.FC<IconProps> = ({ 
  size = 24, 
  className = "",
  ...props 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <path d="M7.5 7.2c3.3-1 5.7-1 9 0" />
      <path d="M7.5 16.8c3.3 1 5.7 1 9 0" />
      <path d="M15.5 17.2c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.333.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5L15 6" />
      <path d="M8.5 17.2c0 1-1.356 3-1.832 3-1.429 0-2.746-1.667-3.364-3-.639-1.333-.478-5.833 1.435-11.5 1.388-1.015 2.862-1.34 4.299-1.5L9 6" />
    </svg>
  );
};
