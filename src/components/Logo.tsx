/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = "", iconOnly = false, variant = 'dark' }) => {
  const isLight = variant === 'light';
  
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative w-14 h-14 shrink-0">
        {/* Shield Outline (Light Blue) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-sm">
          <path 
            d="M50,5 L15,20 V50 C15,75 50,95 50,95 C50,95 85,75 85,50 V20 L50,5 Z" 
            fill="none" 
            stroke="#1E6FA8" 
            strokeWidth="4"
            strokeLinejoin="round"
          />
          
          {/* Eagle Head (Silver/Grey) */}
          <path 
            d="M32,42 C32,32 45,22 65,22 L82,22 C85,22 88,25 88,28 C88,32 85,35 80,35 L65,35 L75,45 L60,55 L50,45 L40,55 L32,42 Z" 
            fill="#D1D5DB" 
          />
          
          {/* Eagle Neck/Body (Navy - adjusted for light variant) */}
          <path 
            d="M40,55 L50,75 L60,55 L50,45 L40,55 Z" 
            fill={isLight ? "#1E3A5F" : "#0E2A47"} 
            stroke={isLight ? "rgba(255,255,255,0.1)" : "none"}
            strokeWidth="1"
          />

          {/* Star (White with Navy Outline) */}
          <path 
            d="M72,52 L76,64 L88,64 L78,72 L82,84 L72,76 L62,84 L66,72 L56,64 L68,64 Z" 
            fill="white" 
            stroke="#0E2A47" 
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <h1 className={`${isLight ? 'text-white' : 'text-brand-charcoal'} font-display font-bold text-2xl leading-none tracking-tight`}>
            EAGLE STAR
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className={`h-[2px] flex-grow ${isLight ? 'bg-brand-teal' : 'bg-brand-blue'}`}></div>
            <span className={`${isLight ? 'text-brand-teal' : 'text-brand-navy'} font-display font-bold text-[10px] tracking-[0.25em] uppercase whitespace-nowrap`}>
              SECURITY
            </span>
            <div className={`h-[2px] flex-grow ${isLight ? 'bg-brand-teal' : 'bg-brand-blue'}`}></div>
          </div>
          <span className={`${isLight ? 'text-white/50' : 'text-brand-charcoal/60'} font-display font-medium text-[9px] tracking-[0.15em] uppercase mt-1 text-center`}>
            Safe & Sound
          </span>
        </div>
      )}
    </div>
  );
};
