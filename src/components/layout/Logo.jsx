import React from 'react';

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-600 text-base font-bold text-white shadow-sm shadow-blue-500/25">
        B
      </div>
      <span className="text-xl font-bold tracking-tight text-white">
        Brand Collabz
      </span>
    </span>
  );
}