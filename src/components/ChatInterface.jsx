import React, { useRef } from 'react';
import { Upload, Send, FileVideo, Image as ImageIcon } from 'lucide-react';

export default function ChatInterface({
  role,
  simpleView,
  onSubmit,
  isLoading,
}) {
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const vitalsRef = useRef(null);
  const historyRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageRef.current?.files?.[0]) formData.append('image', imageRef.current.files[0]);
    if (videoRef.current?.files?.[0]) formData.append('video', videoRef.current.files[0]);
    formData.append('role', role);
    formData.append('simple_view', String(simpleView));
    formData.append('symptoms', textRef.current?.value || '');
    formData.append('vitals', vitalsRef.current?.value || '');
    formData.append('history', historyRef.current?.value || '');
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <label className="block text-sm text-white/70 mb-2">Symptoms & Free Text</label>
            <textarea ref={textRef} rows={6} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Chief complaint, onset, duration, associated symptoms..." />
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <label className="block text-sm text-white/70 mb-2">Vitals</label>
            <textarea ref={vitalsRef} rows={6} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Temp, HR, BP, RR, SpO2..." />
          </div>
          <div className="md:col-span-2 p-4 rounded-xl border border-white/10 bg-white/5">
            <label className="block text-sm text-white/70 mb-2">History</label>
            <textarea ref={historyRef} rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="PMH, meds, allergies, social, family..." />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-white/80 cursor-pointer">
              <div className="p-2 rounded-lg bg-white/10 border border-white/10"><ImageIcon size={18} /></div>
              <span className="text-sm">Upload Image</span>
              <input ref={imageRef} type="file" accept="image/*" className="hidden" />
            </label>
            <label className="inline-flex items-center gap-2 text-white/80 cursor-pointer">
              <div className="p-2 rounded-lg bg-white/10 border border-white/10"><FileVideo size={18} /></div>
              <span className="text-sm">Upload Video</span>
              <input ref={videoRef} type="file" accept="video/*" className="hidden" />
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-lg font-medium disabled:opacity-60"
          >
            <Send size={16} /> {isLoading ? 'Generating...' : 'Generate Analysis'}
          </button>
        </div>
      </div>

      <div className="lg:col-span-1 p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Role</p>
            <p className="text-white font-medium">{role}</p>
          </div>
          <Upload className="text-white/50" size={18} />
        </div>
        <div className="text-sm text-white/70">
          <p>Attach relevant imaging and provide structured findings. The system will route text to clinical reasoning and media to imaging analysis, then unify results.</p>
        </div>
      </div>
    </form>
  );
}
