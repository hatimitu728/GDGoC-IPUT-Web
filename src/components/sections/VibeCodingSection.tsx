import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Sparkles, CheckCircle2, Play, ExternalLink, Code2, Cpu, Zap, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Preset {
  prompt: string;
  step1: string;
  step2: string;
  step3: string;
  cardTitle: string;
  cardBadge: string;
  cardTag: string;
  cardDesc: string;
  cardTech: string[];
  codeSnippet: string;
  demoState: {
    latency: string;
    tokens: string;
    cost: string;
  };
}

const PRESETS: Preset[] = [
  {
    prompt: '90分でAI添削日記アプリを構築・公開して',
    step1: '✔ Architecture: Next.js + Gemini 3.1 + Firebase Auth',
    step2: '⚡ Compiling RAG Pipeline & Prompt Evaluation...',
    step3: '🚀 Deployed to Edge in 1.4s. Instant Live Preview.',
    cardTitle: 'AI添削ジャーナル',
    cardBadge: 'WORKSHOP VERIFIED',
    cardTag: '01. AI Studio & Firebase',
    cardDesc: 'Gemini 3.1を呼び出し、思考の癖や論理展開を即座にフィードバックする実証アプリ。受講生が90分でURLまでローンチ。',
    cardTech: ['Gemini 3.1 Flash', 'Firebase Firestore', 'Vercel Edge'],
    codeSnippet: `// Gemini 3.1 Journal Analyzer API
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI();

export async function analyzeJournal(entry: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash',
    contents: [{ role: 'user', text: \`Review entry: \${entry}\` }],
    config: { temperature: 0.3 }
  });
  return response.text;
}`,
    demoState: { latency: '240ms', tokens: '412 tps', cost: '$0.0001' },
  },
  {
    prompt: '自然言語からAndroid画面を自律更新するエージェントを作って',
    step1: '✔ Architecture: Kotlin + Android Agent Tools + Antigravity',
    step2: '⚡ Binding UI Hierarchy & Device Input Synthesizer...',
    step3: '🚀 Agent Active: Navigating Compose tree autonomously.',
    cardTitle: 'Antigravity Autonomous Agent',
    cardBadge: 'ADVANCED PROTOTYPE',
    cardTag: '02. Android Agent Tools',
    cardDesc: '自然言語プロンプトからCLI経由でAndroidアプリのUIとロジックを自律更新する次世代ワークフロー。CyberAgent GDEとの共同研究。',
    cardTech: ['Android Jetpack', 'Antigravity CLI', 'Gemini Live'],
    codeSnippet: `// Autonomous Android Compose Agent
class AgentSynthesizer(val context: Context) {
  fun executeDirective(prompt: String) {
    val tree = AccessibilityNodeTree.capture()
    val actionPlan = GeminiLive.synthesizeAction(tree, prompt)
    actionPlan.dispatchTouchGestures()
  }
}`,
    demoState: { latency: '120ms', tokens: '890 tps', cost: '$0.0003' },
  },
  {
    prompt: 'マルチキャンパス講義を要約して自動QAナレッジベース化して',
    step1: '✔ Architecture: Google Meet API + Vector Store + Gemini 3.1',
    step2: '⚡ Chunking Audio Transcript & Indexing Key Terms...',
    step3: '🚀 Live Sync: 3 Campuses queryable in 300ms latency.',
    cardTitle: 'Cross-Campus Academic Synapse',
    cardBadge: 'COMMUNITY PROJECT',
    cardTag: '03. Knowledge Base',
    cardDesc: '東京・大阪・名古屋のハイブリッド講義とミートアップの音声をリアルタイム要約し、学術Q&Aとして蓄積する独自プラットフォーム。',
    cardTech: ['Vector Database', 'Speech-to-Text', 'Google Cloud Run'],
    codeSnippet: `// 3-Campus Vector Streaming Indexer
export async function indexLectureStream(audioBuffer: Buffer) {
  const transcript = await whisperCloud.transcribe(audioBuffer);
  const vector = await embedText(transcript);
  await campusVectorDb.upsert({ id: Date.now(), vector, meta: { campus: 'Tokyo 50F' } });
}`,
    demoState: { latency: '310ms', tokens: '640 tps', cost: '$0.0002' },
  },
];

export default function VibeCodingSection() {
  const container = useRef<HTMLDivElement>(null);
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [activeViewMode, setActiveViewMode] = useState<'preview' | 'code'>('preview');
  const current = PRESETS[activePresetIndex];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=90%',
            pin: true,
            scrub: 0.6,
          },
        });

        // Dynamic 3D tilt & elevation transition on scroll
        tl.to('.typing-cursor', { opacity: 0, repeat: -1, yoyo: true, duration: 0.2 })
          .to('.terminal-step-1', { opacity: 1, color: '#34A853', duration: 0.2 }, 0.05)
          .to('.terminal-step-2', { opacity: 1, color: '#FBBC04', duration: 0.25 }, 0.2)
          .to('.terminal-step-3', { opacity: 1, color: '#ffffff', duration: 0.25 }, 0.4)
          .to('.data-beam-line', { strokeDashoffset: 0, opacity: 1, duration: 0.4 }, 0.2)
          .to('.live-preview-box', {
            rotateY: -3,
            rotateX: 2,
            scale: 1.02,
            boxShadow: '0 25px 60px -15px rgba(66,133,244,0.3)',
            duration: 0.5,
          }, 0.3)
          .fromTo('.floating-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.3 }, 0.4);
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section
      id="vibe-coding"
      ref={container}
      className="relative w-full min-h-screen bg-[#070C16] border-b border-white/10 flex items-center py-20 px-6 overflow-hidden"
    >
      {/* Background Subtle Wave Grid */}
      <div className="absolute inset-0 swiss-dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Terminal & Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FBBC04]" />
              <span className="text-xs font-mono text-[#FBBC04] uppercase tracking-widest font-bold">
                // 03. Vibe Coding &amp; Fast Prototyping
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              言葉から、動くシステムへ。<br />
              <span className="text-slate-400 font-normal text-2xl sm:text-3xl">次世代AIワークフローの体感。</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              GDG on Campus IPUTでは、Gemini 3.1や最新のエージェントツールを組み合わせた「Vibe Coding」を徹底実践。アイデアを数行のプロンプトでコード化し、即座に動かします。
            </p>
          </div>

          {/* Interactive Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1">
              <Play className="w-3 h-3 text-[#34A853]" /> PRESETS:
            </span>
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActivePresetIndex(idx)}
                className={`px-3 py-1.5 text-xs font-mono transition-all border cursor-pointer ${
                  activePresetIndex === idx
                    ? 'bg-white text-slate-900 font-bold border-white shadow-md'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30'
                }`}
              >
                0{idx + 1}. {p.cardTitle}
              </button>
            ))}
          </div>

          {/* Minimal Terminal Window */}
          <div className="bg-[#0B132B] border border-white/15 p-5 sm:p-6 font-mono text-xs sm:text-sm text-slate-300 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EA4335]" />
                <div className="w-3 h-3 rounded-full bg-[#FBBC04]" />
                <div className="w-3 h-3 rounded-full bg-[#34A853]" />
                <span className="ml-2 text-[11px] text-slate-400 hidden sm:inline">vibe-agent --model gemini-3.1-flash</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#34A853] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-ping" />
                <span>HOT COMPILER</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-slate-200 flex items-start gap-2">
                <span className="text-[#4285F4] font-bold select-none">$</span>
                <span className="text-white font-medium">vibe dev &quot;{current.prompt}&quot;</span>
              </div>

              <div className="terminal-step-1 text-[#34A853] flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{current.step1}</span>
              </div>

              <div className="terminal-step-2 text-[#FBBC04] flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                <span>{current.step2}</span>
              </div>

              <div className="terminal-step-3 text-white font-bold flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
                <span>{current.step3}</span>
                <span className="typing-cursor inline-block w-2 h-4 bg-[#4285F4]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Dynamic Preview with 3D Depth & Tabs (6 cols) */}
        <div className="lg:col-span-6 relative">
          <div className="live-preview-box bg-[#0D1829] border border-[#4285F4]/40 p-6 shadow-2xl relative transition-all duration-500">
            {/* Top Toolbar / View Switcher */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#4285F4]">{current.cardTag}</span>
                <span className="text-[10px] bg-white/10 text-slate-300 px-2 py-0.5 tracking-wider font-mono">
                  {current.cardBadge}
                </span>
              </div>

              <div className="flex items-center gap-1 p-0.5 bg-white/5 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setActiveViewMode('preview')}
                  className={`px-2.5 py-1 flex items-center gap-1 transition-colors cursor-pointer ${
                    activeViewMode === 'preview' ? 'bg-[#4285F4] text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>UI Preview</span>
                </button>
                <button
                  onClick={() => setActiveViewMode('code')}
                  className={`px-2.5 py-1 flex items-center gap-1 transition-colors cursor-pointer ${
                    activeViewMode === 'code' ? 'bg-[#4285F4] text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3 h-3" />
                  <span>Code</span>
                </button>
              </div>
            </div>

            {/* Dynamic Content: UI Preview vs Code */}
            {activeViewMode === 'preview' ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-black text-white">{current.cardTitle}</h3>
                  <div className="text-[10px] font-mono text-[#34A853] bg-[#34A853]/10 border border-[#34A853]/20 px-2 py-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                    <span>0 ERRORS</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{current.cardDesc}</p>

                {/* Simulated Interactive UI Widget */}
                <div className="p-4 bg-black/40 border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                    <span>RUNTIME TELEMETRY</span>
                    <span className="text-[#FBBC04]">EDGE STREAMING</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2 bg-white/5 border border-white/5">
                      <span className="text-slate-500 block text-[10px]">LATENCY</span>
                      <span className="text-white font-bold">{current.demoState.latency}</span>
                    </div>
                    <div className="p-2 bg-white/5 border border-white/5">
                      <span className="text-slate-500 block text-[10px]">THROUGHPUT</span>
                      <span className="text-[#34A853] font-bold">{current.demoState.tokens}</span>
                    </div>
                    <div className="p-2 bg-white/5 border border-white/5">
                      <span className="text-slate-500 block text-[10px]">UNIT COST</span>
                      <span className="text-[#4285F4] font-bold">{current.demoState.cost}</span>
                    </div>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                  {current.cardTech.map((tech, i) => (
                    <span
                      key={i}
                      className="floating-badge text-xs font-mono text-[#4285F4] bg-[#4285F4]/10 border border-[#4285F4]/20 px-2.5 py-1"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>api/agent/route.ts</span>
                  <span className="text-[#4285F4]">TypeScript · Gemini SDK</span>
                </div>
                <pre className="p-3 bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed max-h-[220px]">
                  <code>{current.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
