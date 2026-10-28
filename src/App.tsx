/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import StatementSection from './components/sections/StatementSection';
import VibeCodingSection from './components/sections/VibeCodingSection';
import ShowcaseSection from './components/sections/ShowcaseSection';
import CampusSection from './components/sections/CampusSection';
import FooterSection from './components/sections/FooterSection';
import JoinModal from './components/JoinModal';

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar onOpenJoin={() => setIsJoinModalOpen(true)} />
      
      <main className="relative w-full bg-[#0F172A] min-h-screen text-white overflow-hidden">
        <HeroSection onOpenJoin={() => setIsJoinModalOpen(true)} />
        <StatementSection />
        <VibeCodingSection />
        <ShowcaseSection />
        <CampusSection />
        <FooterSection onOpenJoin={() => setIsJoinModalOpen(true)} />
      </main>

      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </SmoothScroll>
  );
}
