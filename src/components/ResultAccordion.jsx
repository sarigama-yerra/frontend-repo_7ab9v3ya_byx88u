import React from 'react';

function ConfidenceBadge({ score }) {
  const pct = Math.round((score ?? 0) * 100);
  let color = 'bg-red-500/20 text-red-300 border-red-500/30';
  if (pct >= 80) color = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  else if (pct >= 60) color = 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30';
  return (
    <span className={`text-xs px-2 py-1 rounded border ${color}`}>{pct}% confidence</span>
  );
}

export default function ResultAccordion({ data }) {
  if (!data) return null;

  const sections = [
    { key: 'summary', label: 'Summary' },
    { key: 'text_reasoning', label: 'Text Reasoning' },
    { key: 'image_findings', label: 'Image Findings' },
    { key: 'integrated_assessment', label: 'Integrated Assessment' },
    { key: 'next_steps', label: 'Recommended Next Steps' },
    { key: 'patient_friendly', label: 'Patient-Friendly Summary' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Analysis</h3>
        <ConfidenceBadge score={data?.confidence} />
      </div>
      {sections.map((s) => (
        <details key={s.key} className="group border border-white/10 rounded-lg bg-white/5">
          <summary className="flex items-center justify-between list-none cursor-pointer p-3">
            <span className="text-white font-medium">{s.label}</span>
            <span className="text-white/50 group-open:rotate-180 transition">▾</span>
          </summary>
          <div className="px-4 pb-4 text-white/80 text-sm whitespace-pre-wrap">
            {Array.isArray(data?.[s.key]) ? (
              <ul className="list-disc pl-5">
                {data[s.key].map((item, idx) => (
                  <li key={idx}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
                ))}
              </ul>
            ) : typeof data?.[s.key] === 'object' ? (
              <pre className="text-xs bg-black/30 p-3 rounded border border-white/10 overflow-auto">{JSON.stringify(data[s.key], null, 2)}</pre>
            ) : (
              data?.[s.key] || '—'
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
