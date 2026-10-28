import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenJoin: () => void;
}

export default function Navbar({ onOpenJoin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Philosophy', href: '#statement' },
    { label: 'Vibe Coding', href: '#vibe-coding' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Campuses', href: '#campuses' },
    { label: 'Community', href: '#join' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0F172A]/85 backdrop-blur-md border-b border-white/10 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-base md:text-lg font-black tracking-tight text-white hover:text-[#4285F4] transition-colors whitespace-nowrap shrink-0 font-mono"
          >
            &#123; GDG on Campus IPUT &#125;
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-semibold text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenJoin}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-[#4285F4] hover:text-white transition-all duration-200 whitespace-nowrap shrink-0 rounded-none shadow-sm cursor-pointer"
            >
              Join Community
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B132B]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold tracking-wider uppercase text-slate-200 hover:text-[#4285F4] transition-colors py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoin();
                }}
                className="w-full py-3 text-center text-xs font-bold uppercase tracking-widest text-slate-900 bg-white hover:bg-[#4285F4] hover:text-white transition-colors"
              >
                Join Community
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
