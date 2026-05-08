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
      <div
        className={`relative flex h-15 w-15 shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] border ${
          isLight
            ? 'border-white/15 bg-white/8 shadow-[0_18px_30px_rgba(10,25,41,0.28)]'
            : 'border-brand-blue/12 bg-white shadow-[0_18px_30px_rgba(10,25,41,0.08)]'
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isLight
              ? 'bg-[linear-gradient(135deg,rgba(20,184,166,0.22),transparent_55%),radial-gradient(circle_at_top_right,rgba(197,160,89,0.3),transparent_45%)]'
              : 'bg-[linear-gradient(135deg,rgba(19,78,127,0.10),transparent_55%),radial-gradient(circle_at_top_right,rgba(197,160,89,0.18),transparent_45%)]'
          }`}
        />
        <div className="relative flex items-end gap-1.5 font-display text-[1.15rem] font-bold uppercase tracking-[0.28em]">
          <span className={isLight ? 'text-white' : 'text-brand-navy'}>E</span>
          <span className="text-brand-gold">S</span>
        </div>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <h1 className={`${isLight ? 'text-white' : 'text-brand-charcoal'} font-display text-[1.55rem] font-semibold leading-none tracking-[0.08em]`}>
            EAGLE STAR
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <div className={`h-px w-10 ${isLight ? 'bg-brand-teal/80' : 'bg-brand-blue/60'}`}></div>
            <span className={`${isLight ? 'text-brand-teal' : 'text-brand-blue'} font-sans text-[0.72rem] font-extrabold tracking-[0.38em] uppercase whitespace-nowrap`}>
              SECURITY
            </span>
            <div className={`h-px w-10 ${isLight ? 'bg-brand-teal/80' : 'bg-brand-blue/60'}`}></div>
          </div>
          <span className={`${isLight ? 'text-white/58' : 'text-brand-charcoal/58'} mt-2 text-[0.78rem] font-medium tracking-[0.18em] uppercase`}>
            Risk & Response
          </span>
        </div>
      )}
    </div>
  );
};
