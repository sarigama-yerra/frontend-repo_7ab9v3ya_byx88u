import React, { useEffect, useState } from 'react';
import HeroCover from './components/HeroCover';
import RoleSelector from './components/RoleSelector';
import ChatInterface from './components/ChatInterface';
import ResultAccordion from './components/ResultAccordion';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function App() {
  const [role, setRole] = useState('Clinician');
  const [simpleView, setSimpleView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // load local history from localStorage
    const saved = localStorage.getItem('rafael_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rafael_history', JSON.stringify(history));
  }, [history]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
      setHistory((h) => [{ timestamp: Date.now(), role, simpleView, output: data }, ...h].slice(0, 20));
    } catch (e) {
      setResult({
        summary: 'Error contacting server',
        text_reasoning: String(e),
        image_findings: 'N/A',
        integrated_assessment: 'N/A',
        next_steps: [],
        patient_friendly: 'Something went wrong.',
        confidence: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportPDF = async () => {
    if (!result) return;
    const res = await fetch(`${API_BASE}/export`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: result }),
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rafael-report.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroCover />

      <main className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
        <div className="p-5 rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur mb-6">
          <RoleSelector role={role} onChange={setRole} simpleView={simpleView} onToggleView={setSimpleView} />
        </div>

        <div className="p-5 rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur">
          <ChatInterface role={role} simpleView={simpleView} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {result && (
          <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Results</h2>
              <div className="flex items-center gap-3">
                <button onClick={exportPDF} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-sm">Export PDF</button>
              </div>
            </div>
            <ResultAccordion data={result} />
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur">
            <h3 className="text-lg font-semibold mb-3">History</h3>
            <div className="space-y-2">
              {history.map((h, idx) => (
                <button
                  key={idx}
                  onClick={() => setResult(h.output)}
                  className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>{new Date(h.timestamp).toLocaleString()} — {h.role} — {h.simpleView ? 'Simple' : 'Clinical'}</span>
                    <span className="text-white/50">View</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <footer className="py-10 text-center text-white/40 text-sm">RAFAEL — Medical Assistant for Clinicians</footer>
      </main>
    </div>
  );
}
