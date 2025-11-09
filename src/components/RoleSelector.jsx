import React from 'react';

export default function RoleSelector({ role, onChange, simpleView, onToggleView }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
      <div className="flex items-center gap-3">
        <label className="text-sm text-white/80">I am a</label>
        <div className="inline-flex items-center gap-2 bg-white/10 p-1 rounded-lg">
          {['Clinician', 'Patient'].map((r) => (
            <button
              key={r}
              onClick={() => onChange(r)}
              className={`px-3 py-1.5 text-sm rounded-md transition ${
                role === r ? 'bg-emerald-500 text-black' : 'text-white/80 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-white/60">View</span>
        <div className="inline-flex items-center gap-2 bg-white/10 p-1 rounded-lg">
          {[
            { label: 'Simple', value: true },
            { label: 'Clinical', value: false },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => onToggleView(opt.value)}
              className={`px-3 py-1.5 text-sm rounded-md transition ${
                simpleView === opt.value ? 'bg-blue-400 text-black' : 'text-white/80 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
