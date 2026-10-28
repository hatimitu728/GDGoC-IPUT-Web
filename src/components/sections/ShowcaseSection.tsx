import { useRef, useState, useMemo, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Users, MapPin, ArrowRight, X, Sparkles, Activity, ArrowDown, FastForward } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface ShowcaseEvent {
  id: string;
  tag: string;
  category: 'flagship' | 'workshop' | 'meetup';
  color: string;
  title: string;
  desc: string;
  date: string;
  location: string;
  stats: string;
  details: string;
  highlights: string[];
  image?: string;
  keyMetrics: string;
}

const ALL_EVENTS: ShowcaseEvent[] = [
  {
    id: 'ai-studio',
    tag: 'Hands-on Sprint',
    category: 'workshop',
    color: '#4285F4',
    title: 'Google AI Studio & Firebase',
    desc: '90分でAI添削機能付きアプリをゼロから構築・本番公開した実践型ワークショップ。',
    date: '2026 Spring',
    location: 'Tokyo Cocoon Tower 50F',
    stats: '52 Students · 100% Deployed',
    keyMetrics: '90m Deploy Velocity',
    details: 'Google AI StudioのGemini 3.1 Flash APIとFirebase Authentication / Firestoreを組み合わせ、受講者が各自の日記添削AIアプリを即座にVercelへデプロイ。アイデアから本番URLまで90分の最短記録を達成しました。',
    highlights: ['Gemini 3.1 Flash APIインテグレーション', 'Firebase認証 & Firestoreによる永続化', 'Next.js App Routerでの即時ビルド'],
    image: '/src/assets/images/showcase_hackathon_stage_1793178206607.jpg',
  },
  {
    id: 'tokyo-python',
    tag: 'International Meetup',
    category: 'meetup',
    color: '#FBBC04',
    title: 'Tokyo Python Meetup @ 50F',
    desc: 'コクーンタワー50階ラウンジで開催された国際技術交流カンファレンス。海外エンジニアと英語で共同セッション。',
    date: '2026 Winter',
    location: 'Tokyo Cocoon Tower Lounge',
    stats: '85 Engineers · Bilingual',
    keyMetrics: 'Global Networking',
    details: '世界各国のPythonエンジニアが東京新宿コクーンタワーに集結。IPUT学生が英語で登壇し、自作のAIエージェントアーキテクチャや学生主導のGDGコミュニティ運営モデルを発表しました。',
    highlights: ['英語プレゼンテーション＆質疑応答', 'Python × GenAIのエッジ推論パイプライン', 'グローバルテックネットワークの構築'],
  },
  {
    id: 'build-with-ai',
    tag: 'Large Conference',
    category: 'flagship',
    color: '#34A853',
    title: 'Build with AI Kansai 2026',
    desc: '大阪梅田キャンパスにて454名のエンジニア・学生を動員した関西最大級の共催カンファレンス。',
    date: '2026 Q1',
    location: 'Osaka Umeda Campus',
    stats: '454 Attendees · 14 Sessions',
    keyMetrics: '454 Engineers Mobilized',
    details: 'Google Cloud・Google Developer Groups関西支部との共催により、大阪梅田の大型ホールを満員にしたカンファレンス。基調講演からハンズオンブースまで、IPUT生が企画運営を先導しました。',
    highlights: ['関西最大規模のエンジニア動員（454名）', 'Google Developer Experts (GDE) との直接対談', '学生プロダクトショーケース特設ブース'],
    image: '/src/assets/images/showcase_hackathon_stage_1793178206607.jpg',
  },
  {
    id: 'antigravity-agent',
    tag: 'Autonomous Architecture',
    category: 'workshop',
    color: '#EA4335',
    title: 'Antigravity x Android Agent',
    desc: 'CyberAgent GDE登壇による、次世代エージェント駆動開発とAndroid UI自律操作ハンズオン。',
    date: '2026 Autumn',
    location: 'Hybrid (Tokyo / Nagoya)',
    stats: '60 Devs · Hands-on Coding',
    keyMetrics: 'Agent-Driven Testing',
    details: 'スマートフォン上のUI階層を自然言語AIが認識し、自動でタップ・入力・バリデーションを実行する先進的なAgent技術を学習。CyberAgentの第一線エンジニアから直接アーキテクチャを学びました。',
    highlights: ['Android Jetpack Compose AST解析', 'Gemini Multimodal Live APIによる画面認識', '次世代自律テスト＆操作エージェント'],
  },
  {
    id: 'waseda-iput',
    tag: 'Joint Exhibition',
    category: 'flagship',
    color: '#4285F4',
    title: 'Waseda x IPUT Showcase',
    desc: '早稲田大学支部との合同プロダクト発表会。産学協同で生み出した社会実装デモのピッチバトル。',
    date: '2026 Summer',
    location: 'Tokyo & Online Hybrid',
    stats: '12 Teams · 6 Venture Mentors',
    keyMetrics: 'VC Pitches & Demo',
    details: '他大学のGDGチャプターと切磋琢磨する合同ピッチイベント。IPUT専門職大学ならではの「現場で動く本番プロダクト」を披露し、ベンチャーキャピタルやスタートアップメンターから高評価を獲得。',
    highlights: ['他大学チャプターとの実力競い合い', 'VC/起業家からの実践的事業フィードバック', '共同ハッカソンチームの結成'],
  },
];

interface ShowcaseSectionProps {
  initialEvents?: ShowcaseEvent[];
}

export default function ShowcaseSection({ initialEvents = ALL_EVENTS }: ShowcaseSectionProps) {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<ShowcaseEvent | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [filter, setFilter] = useState<'all' | 'flagship' | 'workshop'>('all');
  const [isNearEnd, setIsNearEnd] = useState(false);

  const [itemCount, setItemCount] = useState<number>(5);

  // Dynamic filtering of valid events (rejects empty/unpopulated slots, slices to active count)
  const validEvents = useMemo(() => {
    return initialEvents
      .filter((e) => e && e.title && e.title.trim().length > 0)
      .filter((e) => filter === 'all' || e.category === filter)
      .slice(0, itemCount);
  }, [initialEvents, filter, itemCount]);

  const totalSteps = validEvents.length;

  useGSAP(
    () => {
      const el = track.current;
      if (!el || !container.current) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Calculate the exact distance needed to reveal the last card
        // If content fits completely inside screen, do NOT pin!
        const availableWidth = window.innerWidth;
        const contentWidth = el.scrollWidth;
        const rawDistance = contentWidth - availableWidth + 80;
        const scrollDistance = Math.max(0, rawDistance);

        // CASE 1: Few or fitting items (e.g. 1 or 2 items on widescreen)
        // Skip pinning entirely to avoid scroll hijacking and blank waiting!
        if (scrollDistance <= 0 || validEvents.length <= 1) {
          gsap.set(el, { x: 0 });
          setActiveStep(0);
          setIsNearEnd(true);
          return;
        }

        // CASE 2: Dynamic scroll distance matched exactly to populated items
        const trigger = ScrollTrigger.create({
          trigger: container.current,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          animation: gsap.to(el, {
            x: -scrollDistance,
            ease: 'none',
          }),
          onUpdate: (self) => {
            const currentStep = Math.min(
              totalSteps - 1,
              Math.floor(self.progress * totalSteps)
            );
            setActiveStep(currentStep);
            setIsNearEnd(self.progress >= 0.88);
          },
        });

        // Background kinetic number parallax linked to actual scrollDistance
        gsap.to('.kinetic-num', {
          x: -Math.min(240, scrollDistance * 0.3),
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: 1,
          },
        });

        return () => {
          trigger.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [validEvents, totalSteps] }
  );

  // Trigger ScrollTrigger refresh whenever filtered events change
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
    return () => clearTimeout(timer);
  }, [validEvents]);

  // Jump to next section smoothly (Skip processing)
  const handleSkipToNext = () => {
    const campusEl = document.getElementById('campuses');
    if (campusEl) {
      campusEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="showcase"
      ref={container}
      className="relative w-full min-h-screen lg:h-screen bg-[#0B132B] border-b border-white/10 overflow-hidden py-14 lg:py-0 flex flex-col justify-between"
    >
      {/* Top Header Bar with Live Step Adjuster */}
      <div className="w-full pt-6 lg:pt-10 px-6 lg:px-16 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#FBBC04]" />
            <span className="text-xs font-mono text-[#FBBC04] uppercase tracking-widest font-bold">
              // 04. Innovation Showcase
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">Activity Timeline</h2>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
            <span>ACTIVE STEPS:</span>
            <span className="text-[#34A853] font-bold">
              0{activeStep + 1} / 0{totalSteps}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">DYNAMIC SCROLL LENGTH (AUTO-SKIP BLANK)</span>
          </div>
        </div>

        {/* Dynamic Filters & Milestone Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Item Count Simulator (Live Demonstration of Zero Dead-Scroll) */}
          <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 text-xs font-mono">
            <span className="text-slate-500 px-1.5 text-[10px] hidden sm:inline">DATA COUNT:</span>
            {[1, 2, 3, 5].map((cnt) => (
              <button
                key={cnt}
                onClick={() => setItemCount(cnt)}
                className={`px-2 py-0.5 transition-all cursor-pointer ${
                  itemCount === cnt
                    ? 'bg-[#4285F4] text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cnt} {cnt === 1 ? 'item' : 'items'}
              </button>
            ))}
          </div>

          {/* Dynamic Milestones (Only renders valid count) */}
          <div className="flex items-center gap-1.5">
            {validEvents.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (track.current && container.current) {
                    const scrollDistance = Math.max(0, track.current.scrollWidth - window.innerWidth + 80);
                    const targetProgress = totalSteps > 1 ? i / (totalSteps - 1) : 0;
                    const containerTop = container.current.offsetTop;
                    window.scrollTo({
                      top: containerTop + scrollDistance * targetProgress,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`px-2.5 py-1 font-mono text-xs transition-all border cursor-pointer ${
                  activeStep === i
                    ? 'bg-white text-slate-900 font-bold border-white shadow-md'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30'
                }`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Track Container */}
      <div className="relative my-auto py-6">
        {/* Kinetic Parallax Number Backdrop strictly matched to valid count */}
        <div className="kinetic-num absolute -top-8 left-12 text-[110px] lg:text-[160px] font-black font-mono text-white/[0.03] select-none pointer-events-none whitespace-nowrap">
          {validEvents.map((_, i) => `0${i + 1} `)}
        </div>

        {/* The Horizontal Track */}
        <div
          ref={track}
          className="flex flex-col lg:flex-row items-stretch px-6 lg:pl-16 lg:pr-24 gap-6 lg:gap-8 w-full lg:w-max no-scrollbar overflow-x-auto lg:overflow-visible relative z-10"
        >
          {validEvents.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedEvent(item)}
              className="w-full lg:w-[440px] bg-[#0F172A] border border-white/15 p-6 sm:p-7 transition-all duration-300 hover:border-white hover:-translate-y-2 cursor-pointer flex flex-col justify-between shrink-0 group relative shadow-2xl"
              style={{ borderTop: `4px solid ${item.color}` }}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span
                    className="text-[11px] font-mono font-bold px-2 py-0.5 text-slate-900 uppercase"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-bold">
                    0{index + 1} / 0{totalSteps}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug group-hover:text-slate-100 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.desc}</p>
              </div>

              {/* Bottom Card Meta Box */}
              <div className="space-y-3 pt-3 border-t border-white/10 text-xs font-mono">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" style={{ color: item.color }} />
                    <span className="text-slate-200">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Users className="w-3.5 h-3.5" style={{ color: item.color }} />
                    <span className="text-slate-200">{item.keyMetrics}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                    <MapPin className="w-3 h-3 text-[#EA4335]" />
                    <span className="truncate max-w-[180px]">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white group-hover:text-[#4285F4] transition-colors font-bold text-xs">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Timeline Control & Auto-Skip Status Bar */}
      <div className="px-6 lg:px-16 py-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-slate-400 gap-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#34A853] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
            SYNCHRONIZED TIMELINE
          </span>
          <span className="text-slate-600">|</span>
          <span>{totalSteps} ACTIVE ACTIVITIES</span>
        </div>

        {/* Dynamic Fast-Forward / Skip Button */}
        <div className="flex items-center gap-3">
          {isNearEnd ? (
            <button
              onClick={handleSkipToNext}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white font-bold text-xs uppercase tracking-wider animate-bounce cursor-pointer shadow-lg"
            >
              <span>Continue to Campuses</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSkipToNext}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
            >
              <span>Skip Timeline</span>
              <FastForward className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0B132B] border border-white/20 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            style={{ borderTop: `5px solid ${selectedEvent.color}` }}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-400 uppercase">
              <span>{selectedEvent.tag}</span>
              <span>·</span>
              <span>{selectedEvent.date}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-snug">
              {selectedEvent.title}
            </h3>

            {selectedEvent.image && (
              <div className="relative w-full h-56 mb-6 overflow-hidden border border-white/10">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-300">
                  IPUT Student Engineers Live Hackathon Session
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 border border-white/10 mb-6 text-xs font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#EA4335]" />
                <span className="text-slate-300">{selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#34A853]" />
                <span className="text-slate-300">{selectedEvent.stats}</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>{selectedEvent.details}</p>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FBBC04]" /> Key Architectural Takeaways
                </h4>
                <ul className="space-y-1.5 font-mono text-xs text-slate-200">
                  {selectedEvent.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#4285F4]">❯</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2.5 bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
