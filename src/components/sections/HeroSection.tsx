import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenJoin: () => void;
}

export default function HeroSection({ onOpenJoin }: HeroSectionProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: Pin and scrub convergence
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=75%',
            pin: true,
            scrub: 0.8,
          },
        });

        // 4 geometric shapes converge from corners smoothly
        tl.to('.shape-blue', { x: '35vw', y: '28vh', rotate: 180, scale: 0.65 }, 0)
          .to('.shape-red', { x: '-35vw', y: '28vh', rotate: -180, scale: 0.65 }, 0)
          .to('.shape-yellow', { x: '35vw', y: '-28vh', rotate: 90, scale: 0.65 }, 0)
          .to('.shape-green', { x: '-35vw', y: '-28vh', rotate: -90, scale: 0.65 }, 0)
          .fromTo('.gdg-symbol', { scale: 0.85, opacity: 0.4 }, { scale: 1.05, opacity: 1, duration: 0.5 }, 0.2)
          .fromTo('.hero-copy', { y: 60, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.5 }, 0.4)
          .fromTo('.hero-cta-zone', { y: 30, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.4 }, 0.6);
      });

      // Mobile / Tablet: Smooth entry without scroll trapping
      mm.add('(max-width: 1023px)', () => {
        gsap.from('.shape-blue, .shape-red, .shape-yellow, .shape-green', {
          scale: 0.5,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
        });
        gsap.from('.gdg-symbol, .hero-copy, .hero-cta-zone', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-16 swiss-grid-pattern overflow-hidden border-b border-white/10 pt-24 md:pt-28"
    >
      {/* 4 Google Colors - Geometric Shapes with glow */}
      <div className="shape-blue absolute top-16 left-8 md:top-24 md:left-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#4285F4] opacity-75 blur-xs pointer-events-none shadow-[0_0_50px_rgba(66,133,244,0.4)]" />
      <div className="shape-red absolute top-16 right-8 md:top-24 md:right-20 w-16 h-16 md:w-24 md:h-24 bg-[#EA4335] opacity-75 rotate-45 pointer-events-none shadow-[0_0_50px_rgba(234,67,53,0.4)]" />
      <div className="shape-yellow absolute bottom-24 left-8 md:bottom-28 md:left-20 w-0 h-0 border-l-[35px] border-l-transparent border-r-[35px] border-r-transparent border-b-[60px] border-b-[#FBBC04] md:border-l-[50px] md:border-r-[50px] md:border-b-[85px] opacity-75 pointer-events-none shadow-[0_0_50px_rgba(251,188,4,0.3)]" />
      <div className="shape-green absolute bottom-24 right-8 md:bottom-28 md:right-20 w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-[#34A853] opacity-75 rotate-12 pointer-events-none shadow-[0_0_50px_rgba(52,168,83,0.4)]" />

      {/* Swiss Design Header Line */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[11px] uppercase tracking-widest text-slate-400 font-mono gap-2 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <span>Tokyo</span>
          <span className="text-slate-600">/</span>
          <span>Osaka</span>
          <span className="text-slate-600">/</span>
          <span>Nagoya</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Code2 className="w-3.5 h-3.5 text-[#4285F4]" />
          <span>Student-Led Developer Community</span>
        </div>
      </div>

      {/* Center Content Typography */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-12 md:py-16">
        <div className="gdg-symbol text-2xl sm:text-4xl md:text-6xl font-mono text-white font-black mb-6 tracking-tight">
          &#123; GDG on Campus IPUT &#125;
        </div>

        <h1 className="hero-copy text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-white max-w-5xl leading-[1.1] text-balance">
          「知る」から「創る」へ。<br />
          <span className="text-gradient-google">AIと共に未来を実装する。</span>
        </h1>

        <p className="hero-copy mt-6 text-slate-300 text-sm sm:text-base md:text-lg font-normal max-w-2xl leading-relaxed">
          国際工科専門職大学（東京・大阪・名古屋）の学生が自律運営する次世代デベロッパーコミュニティ。座学を超えて、実社会で動くコードとプロダクトを最速でデプロイする。
        </p>

        {/* Action Button Row */}
        <div className="hero-cta-zone mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenJoin}
            className="px-8 py-4 bg-white text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-[#4285F4] hover:text-white transition-all duration-200 shadow-lg cursor-pointer"
          >
            Join Community
          </button>
          <a
            href="#statement"
            className="px-6 py-4 bg-white/5 border border-white/20 text-slate-200 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <span>Explore Philosophy</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Footer Meta Grid */}
      <div className="hero-cta-zone flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-xs font-mono text-slate-400 border-t border-white/5 pt-4">
        <div>
          <span>CAMPUS NETWORK: TOKYO · OSAKA · NAGOYA</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-500">POWERED BY GOOGLE DEVELOPERS</span>
        </div>
      </div>
    </section>
  );
}
