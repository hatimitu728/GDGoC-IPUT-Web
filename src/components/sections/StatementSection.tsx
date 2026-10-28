import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatementSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Metric numbers count-up with ScrollTrigger
      const counters = document.querySelectorAll<HTMLElement>('.count-up');
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: counter,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            snap: { innerText: 1 },
          }
        );
      });

      // Google colored vertical indicators extending on scroll
      gsap.utils.toArray<HTMLElement>('.metric-bar').forEach((bar) => {
        gsap.to(bar, {
          scaleY: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <section id="statement" ref={container} className="relative w-full border-b border-white/10 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column (Sticky 40%) */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-28 space-y-6">
            <span className="text-xs font-mono text-[#4285F4] uppercase tracking-widest block font-bold">
              // Philosophy &amp; Metrics
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] text-balance">
              「環境 &lt; 行動」<br />
              自律的に手を動かす成長ループ。
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              元Google米国本社副社長の村上憲郎学長が牽引する実務・社会実装指向の環境のもと、
              受け身の講義を超えて自らの手でプロダクトを生み出し、社会に問いかける場を創出します。
            </p>

            {/* Dynamic Real-time Campus Mesh Radar (fills the sticky column dynamically) */}
            <div className="p-4 bg-slate-900/90 border border-white/15 rounded-none space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-slate-400">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#34A853] animate-ping" />
                  3-CAMPUS SYNAPSE MESH
                </span>
                <span className="text-slate-400">P2P STREAM: 60FPS</span>
              </div>

              {/* Dynamic SVG Topology */}
              <div className="relative h-32 w-full bg-[#070C16] border border-white/10 flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 320 120" fill="none">
                  {/* Grid Lines */}
                  <line x1="20" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                  <line x1="160" y1="10" x2="160" y2="110" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />

                  {/* Dynamic Arcs Connecting Campuses */}
                  <path d="M 60 70 Q 160 20 260 70" stroke="#4285F4" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
                  <path d="M 60 70 Q 160 110 260 70" stroke="#34A853" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
                  <path d="M 160 35 L 60 70" stroke="#EA4335" strokeWidth="1.5" strokeOpacity="0.7" />
                  <path d="M 160 35 L 260 70" stroke="#FBBC04" strokeWidth="1.5" strokeOpacity="0.7" />

                  {/* Tokyo Node */}
                  <g className="cursor-pointer">
                    <circle cx="260" cy="70" r="14" fill="#4285F4" fillOpacity="0.2" stroke="#4285F4" strokeWidth="1.5" />
                    <circle cx="260" cy="70" r="4" fill="#4285F4" />
                    <text x="260" y="98" fill="#FAFAFA" fontSize="9" textAnchor="middle" fontFamily="monospace">TOKYO (50F)</text>
                    <text x="260" y="108" fill="#4285F4" fontSize="8" textAnchor="middle" fontFamily="monospace">1.8ms</text>
                  </g>

                  {/* Nagoya Node */}
                  <g className="cursor-pointer">
                    <circle cx="160" cy="35" r="12" fill="#FBBC04" fillOpacity="0.2" stroke="#FBBC04" strokeWidth="1.5" />
                    <circle cx="160" cy="35" r="4" fill="#FBBC04" />
                    <text x="160" y="18" fill="#FAFAFA" fontSize="9" textAnchor="middle" fontFamily="monospace">NAGOYA</text>
                  </g>

                  {/* Osaka Node */}
                  <g className="cursor-pointer">
                    <circle cx="60" cy="70" r="14" fill="#34A853" fillOpacity="0.2" stroke="#34A853" strokeWidth="1.5" />
                    <circle cx="60" cy="70" r="4" fill="#34A853" />
                    <text x="60" y="98" fill="#FAFAFA" fontSize="9" textAnchor="middle" fontFamily="monospace">OSAKA (UMEDA)</text>
                    <text x="60" y="108" fill="#34A853" fontSize="8" textAnchor="middle" fontFamily="monospace">2.1ms</text>
                  </g>
                </svg>
              </div>

              {/* Dynamic Metric Ticker */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] text-slate-400 text-center">
                <div className="p-1.5 bg-white/5 border border-white/5">
                  <span className="text-slate-500 block">NODES</span>
                  <span className="text-white font-bold">3 ACTIVE</span>
                </div>
                <div className="p-1.5 bg-white/5 border border-white/5">
                  <span className="text-slate-500 block">CHANNELS</span>
                  <span className="text-[#4285F4] font-bold">12 SYNCED</span>
                </div>
                <div className="p-1.5 bg-white/5 border border-white/5">
                  <span className="text-slate-500 block">PACKETS</span>
                  <span className="text-[#34A853] font-bold">99.98%</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono text-slate-400">
              <div>
                <span className="text-slate-500 block uppercase">Charter</span>
                <span className="text-white font-medium">Google Developer Groups</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase">Institution</span>
                <span className="text-white font-medium">IPUT University</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (60% Metrics & Evidence) */}
        <div className="lg:col-span-7 space-y-12">
          {/* Metric 1 - Blue */}
          <div className="relative pl-8 border-l border-white/10 py-4">
            <div className="metric-bar absolute -left-[2px] top-0 w-[4px] h-full bg-[#4285F4] scale-y-0 origin-top transition-transform" />
            <div className="text-6xl sm:text-7xl md:text-8xl font-black font-mono tracking-tighter text-white tabular-nums">
              <span className="count-up" data-target="120">0</span>+
            </div>
            <div className="text-xl font-bold mt-2 text-white">Active Student Members</div>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-xl">
              東京・大阪・名古屋の3キャンパスおよび全学年を横断する自発的なコミュニティ。AI、クラウド、モバイルアプリの多分野で自律学習チームが活動。
            </p>
          </div>

          {/* Metric 2 - Red */}
          <div className="relative pl-8 border-l border-white/10 py-4">
            <div className="metric-bar absolute -left-[2px] top-0 w-[4px] h-full bg-[#EA4335] scale-y-0 origin-top transition-transform" />
            <div className="text-6xl sm:text-7xl md:text-8xl font-black font-mono tracking-tighter text-white tabular-nums">
              <span className="count-up" data-target="3">0</span>
            </div>
            <div className="text-xl font-bold mt-2 text-white">Major Urban Hubs</div>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-xl">
              新宿コクーンタワー（東京）、梅田ランドマーク（大阪）、名駅前（名古屋）の3大都市拠点をシームレスに結合し、相互ハイブリッド配信で共同開発。
            </p>
          </div>

          {/* Metric 3 - Green */}
          <div className="relative pl-8 border-l border-white/10 py-4">
            <div className="metric-bar absolute -left-[2px] top-0 w-[4px] h-full bg-[#34A853] scale-y-0 origin-top transition-transform" />
            <div className="text-6xl sm:text-7xl md:text-8xl font-black font-mono tracking-tighter text-white tabular-nums">
              <span className="count-up" data-target="454">0</span>
            </div>
            <div className="text-xl font-bold mt-2 text-white">Attendees in Kansai 2026</div>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-xl">
              「Build with AI Kansai 2026」共催。関西最大規模のエンジニア・学生動員を記録し、Google Cloud・AIエキスパートと直接議論を展開。
            </p>
          </div>

          {/* Metric 4 - Yellow */}
          <div className="relative pl-8 border-l border-white/10 py-4">
            <div className="metric-bar absolute -left-[2px] top-0 w-[4px] h-full bg-[#FBBC04] scale-y-0 origin-top transition-transform" />
            <div className="text-6xl sm:text-7xl md:text-8xl font-black font-mono tracking-tighter text-white tabular-nums">
              <span className="count-up" data-target="90">0</span><span className="text-4xl md:text-5xl font-mono text-[#FBBC04]">min</span>
            </div>
            <div className="text-xl font-bold mt-2 text-white">Sprint to Production Velocity</div>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-xl">
              Vibe Codingと最新Agentツールを駆使し、アイディア発想からURL本番公開までをわずか90分で駆け抜ける超高速プロトタイピング文化。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
