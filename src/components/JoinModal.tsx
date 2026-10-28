import { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [campus, setCampus] = useState<'Tokyo' | 'Osaka' | 'Nagoya'>('Tokyo');
  const [track, setTrack] = useState<'AI & ML' | 'Cloud & Backend' | 'Mobile & Web' | 'Design & Product'>('AI & ML');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-lg bg-[#0B132B] border border-white/20 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-14 h-14 bg-[#34A853]/20 border border-[#34A853] text-[#34A853] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">エントリーを受け付けました</h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
              {campus} キャンパスの {track} トラックへようこそ！ご登録いただいたメールアドレス（{email}）へ公式Slackと次回ミートアップの招待状をお送りしました。
            </p>
            <div className="pt-4">
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-white text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-[#4285F4] hover:text-white transition-colors"
              >
                Close &amp; Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono text-[#4285F4] uppercase tracking-widest block mb-1">
                // Join Community
              </span>
              <h2 className="text-2xl font-black text-white">GDG on Campus IPUT に参加する</h2>
              <p className="text-xs text-slate-400 mt-1">
                東京・大阪・名古屋の学生・エンジニアなら誰でも参加可能です（参加費無料）。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campus Selector */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Select Campus
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Tokyo', 'Osaka', 'Nagoya'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCampus(c)}
                      className={`py-2 text-xs font-bold uppercase tracking-wider transition-colors border ${
                        campus === c
                          ? 'bg-[#4285F4] text-white border-[#4285F4]'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Track Selector */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Primary Interest
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['AI & ML', 'Cloud & Backend', 'Mobile & Web', 'Design & Product'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTrack(t)}
                      className={`py-2 px-3 text-xs font-medium text-left transition-colors border ${
                        track === t
                          ? 'bg-white/15 text-white border-white/40'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name input */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Full Name / Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="山田 太郎 / Taro"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4285F4]"
                />
              </div>

              {/* Email input */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="your-name@iput.ac.jp or gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4285F4]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-[#4285F4] to-[#34A853] hover:opacity-95 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-opacity"
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-500 text-center font-mono">
                Google Developers Community Guidelines &amp; IPUT Student Code of Conduct apply.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
