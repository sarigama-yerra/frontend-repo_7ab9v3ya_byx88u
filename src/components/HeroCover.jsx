import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
        <div className="text-white max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs tracking-wide uppercase">RAFAEL — Medical Assistant for Clinicians</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            AI-powered clinical reasoning and imaging assistance
          </h1>
          <p className="mt-4 text-white/80 text-sm md:text-base">
            Combine structured text analysis with medical imaging to generate integrated assessments, next steps, and patient-friendly summaries.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
    </section>
  );
}
