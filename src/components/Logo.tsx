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
        <img
          src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6"
          alt="Eagle Star Security Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <h1 className={`${isLight ? 'text-white' : 'text-brand-charcoal'} font-display font-bold text-2xl leading-none tracking-tight`}>
            EAGLE STAR
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className={`h-[2px] flex-grow ${isLight ? 'bg-brand-teal' : 'bg-brand-gold'}`}></div>
            <span className={`${isLight ? 'text-brand-teal' : 'text-brand-gold'} font-display font-bold text-[10px] tracking-[0.25em] uppercase whitespace-nowrap`}>
              SECURITY
            </span>
            <div className={`h-[2px] flex-grow ${isLight ? 'bg-brand-teal' : 'bg-brand-gold'}`}></div>
          </div>
          <span className={`${isLight ? 'text-white/50' : 'text-brand-charcoal/60'} font-display font-medium text-[9px] tracking-[0.15em] uppercase mt-1 text-center`}>
            Safe & Sound
          </span>
        </div>
      )}
    </div>
  );
};
