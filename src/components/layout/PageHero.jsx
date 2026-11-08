import React from 'react';

export default function PageHero({ title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden bg-[#150f33] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_85%_0%,rgba(139,92,246,.55),transparent_60%),radial-gradient(40%_60%_at_0%_100%,rgba(79,70,229,.35),transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-[1.08] max-w-2xl">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-white/75 max-w-xl leading-relaxed">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
