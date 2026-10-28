import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail, MessageSquare, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterSectionProps {
  onOpenJoin: () => void;
}

export default function FooterSection({ onOpenJoin }: FooterSectionProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=120%',
            pin: true,
            scrub: 1,
          },
        });

        // Massive typography scale down and gradient liquid fill
        tl.fromTo(
          '.build-text',
          { scale: 2.4, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
        )
        .to('.build-fill', { height: '100%', duration: 0.4 }, 0.4)
        .fromTo('.footer-actions', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0.7);
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.to('.build-fill', {
          height: '100%',
          duration: 1.2,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%',
          },
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <footer
      ref={container}
      id="join"
      className="relative w-full min-h-screen bg-[#070C16] flex flex-col justify-between p-6 sm:p-10 md:p-16 overflow-hidden border-t border-white/10"
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-slate-400 uppercase tracking-widest gap-2">
        <span>GDG on Campus IPUT · Tokyo / Osaka / Nagoya</span>
        <span>Google Developer Community Guidelines Applied</span>
      </div>

      {/* Massive Typography & Liquid Fill Container */}
      <div className="relative flex flex-col items-center justify-center my-auto w-full py-16 text-center select-none">
        <div className="build-text relative inline-block mx-auto">
          {/* Outline Typography (Background) */}
          <span className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.35)] block whitespace-nowrap">
            BUILD WITH US
          </span>

          {/* Liquid Fill 4-Color Gradient from bottom */}
          <div className="build-fill absolute bottom-0 left-0 w-full h-0 overflow-hidden transition-all duration-300 pointer-events-none">
            <span className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-gradient-google block whitespace-nowrap">
              BUILD WITH US
            </span>
          </div>
        </div>

        <p className="mt-6 text-sm md:text-base text-slate-300 max-w-xl mx-auto">
          国際工科専門職大学の学生、そして次世代のプロダクトを共に社会実装したいエンジニアを歓迎します。
        </p>

        <div className="mt-8">
          <button
            onClick={onOpenJoin}
            className="px-10 py-4 bg-white text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-[#4285F4] hover:text-white transition-all shadow-xl cursor-pointer"
          >
            Apply to Join Chapter
          </button>
        </div>
      </div>

      {/* Footer Actions Grid */}
      <div className="footer-actions max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10 text-left">
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
            OFFICIAL PLATFORM
          </span>
          <a
            href="https://gdg.community.dev"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold text-white hover:text-[#4285F4] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Bevy Community Page</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-slate-400">Google公式デベロッパーハブでのメンバー登録</p>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
            INTERNAL COMMS
          </span>
          <div className="text-sm font-mono text-slate-200 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#FBBC04]" />
            <span>Slack: #2__gdgoc_iput</span>
          </div>
          <p className="text-xs text-slate-400">参加承認後にWorkspaceへの招待リンクを発行</p>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
            COORDINATION &amp; INQUIRIES
          </span>
          <a
            href="mailto:gdgoc_iput@t.iput.ac.jp"
            className="text-sm font-mono text-slate-200 hover:text-[#34A853] transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#34A853]" />
            <span>gdgoc_iput@t.iput.ac.jp</span>
          </a>
          <p className="text-xs text-slate-400">大学・企業様からの共催・登壇相談窓口</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pt-8 text-[11px] font-mono text-slate-500">
        &copy; {new Date().getFullYear()} Google Developer Groups on Campus IPUT (Tokyo · Osaka · Nagoya). All rights reserved.
      </div>
    </footer>
  );
}
