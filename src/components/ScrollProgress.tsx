import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(el, { scaleX: p });
        setPercent(Math.round(p * 100));
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none bg-slate-900/60 backdrop-blur-xs">
      <div
        ref={barRef}
        className="w-full h-full origin-left transform scale-x-0 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] transition-transform duration-75"
        style={{ transformOrigin: '0% 50%' }}
      />
      {/* Subtle read indicator in bottom corner or top corner */}
      <div className="absolute top-2 right-4 text-[10px] font-mono tracking-widest text-slate-500 opacity-60 tabular-nums select-none hidden md:block">
        {percent}% SCROLLED
      </div>
    </div>
  );
}
