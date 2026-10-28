import { useState } from 'react';
import { MapPin, Building2, Users2, Code, Compass } from 'lucide-react';

interface CampusData {
  id: string;
  name: string;
  kanjiName: string;
  badge: string;
  color: string;
  description: string;
  location: string;
  specs: {
    altitude: string;
    focus: string;
    capacity: string;
    transit: string;
  };
  image: string;
  team: {
    role: string;
    name: string;
    grade: string;
    focus: string;
  }[];
  activeTracks: string[];
}

const CAMPUSES: CampusData[] = [
  {
    id: 'tokyo',
    name: 'Tokyo Campus',
    kanjiName: '東京キャンパス（新宿）',
    badge: 'HQ & 50F SKY LOUNGE',
    color: '#4285F4',
    description: '世界第2位の高さを誇る教育施設「モード学園コクーンタワー」内に位置。50階の絶景ラウンジと最新AI研究ラボを拠点に、Tokyo Python Meetup等の国際セッションを開催。',
    location: '東京都新宿区西新宿1-7-3 モード学園コクーンタワー',
    specs: {
      altitude: '50F · 地上200m',
      focus: 'Generative AI & Agent Architecture',
      capacity: '120席 ラウンジ・スタジオ',
      transit: '新宿駅西口 徒歩3分（地下直結）',
    },
    image: '/src/assets/images/campus_tokyo_cocoon_1793178204665.jpg',
    team: [
      { role: 'Campus Lead', name: 'K. Tanaka', grade: '3rd Year AI Systems', focus: 'Gemini Agent Orchestration' },
      { role: 'Tech Core', name: 'S. Sato', grade: '2nd Year Software Eng', focus: 'Next.js & Cloud Edge' },
      { role: 'Community Lead', name: 'M. Suzuki', grade: '3rd Year Product Design', focus: 'Developer Experience & UI' },
    ],
    activeTracks: ['Gemini 3.1 & Interactions API', 'Android Agent Tools', 'Cloud Run & Vertex AI'],
  },
  {
    id: 'osaka',
    name: 'Osaka Campus',
    kanjiName: '大阪キャンパス（梅田）',
    badge: 'KANSAI TECH HUB',
    color: '#34A853',
    description: '西日本最大のターミナル梅田駅直結の先進キャンパス。「Build with AI Kansai 2026」で454名を動員した関西の熱気あふれる開発拠点で、産学協同ハッカソンが頻繁に開催。',
    location: '大阪府大阪市北区梅田3-3-1',
    specs: {
      altitude: '総合開発ホール',
      focus: 'Large-scale Cloud & Kansai Ecosystem',
      capacity: '400名収容 メディアホール',
      transit: 'JR大阪駅・梅田駅直結 徒歩3分',
    },
    image: '/src/assets/images/campus_osaka_umeda_1793178205555.jpg',
    team: [
      { role: 'Campus Lead', name: 'R. Yamamoto', grade: '3rd Year Cloud Engineering', focus: 'Distributed Systems' },
      { role: 'DevRel Lead', name: 'Y. Inoue', grade: '2nd Year Web Dev', focus: 'Open Source Community' },
      { role: 'Hackathon Director', name: 'H. Takahashi', grade: '3rd Year AI Eng', focus: 'Competitive Prototyping' },
    ],
    activeTracks: ['Google Cloud & Kubernetes', 'Kansai Developer Alliances', 'Hackathon Sprints'],
  },
  {
    id: 'nagoya',
    name: 'Nagoya Campus',
    kanjiName: '名古屋キャンパス（名駅前）',
    badge: 'INNOVATION ENGINE',
    color: '#FBBC04',
    description: 'ものづくりの中枢・中部エリアを牽引する名駅前のスパイラルタワーズ近傍拠点。AIソフトウェアのみならず、ハードウェアIoTやモビリティデータ連動の研究プロジェクトが盛ん。',
    location: '愛知県名古屋市中村区名駅4-27-1',
    specs: {
      altitude: 'イノベーションスタジオ',
      focus: 'Edge AI, IoT & Autonomous Hardware',
      capacity: '80席 コラボレーションラボ',
      transit: 'JR名古屋駅 桜通口 徒歩3分',
    },
    image: '/src/assets/images/campus_nagoya_meieki_1793178206526.jpg',
    team: [
      { role: 'Campus Lead', name: 'T. Kato', grade: '3rd Year Embedded AI', focus: 'Edge Devices & Robotics' },
      { role: 'Software Lead', name: 'A. Watanabe', grade: '2nd Year Data Science', focus: 'Real-time Telemetry' },
      { role: 'Operations', name: 'K. Ito', grade: '1st Year Software Dev', focus: 'Student Outreach' },
    ],
    activeTracks: ['Edge Gemini & Micro-agents', 'Mobility & Robotics Tech', 'Cross-Campus Streaming'],
  },
];

export default function CampusSection() {
  const [activeId, setActiveId] = useState<string>('tokyo');
  const current = CAMPUSES.find((c) => c.id === activeId) || CAMPUSES[0];

  return (
    <section id="campuses" className="relative w-full bg-[#070C16] border-b border-white/10 py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs font-mono text-[#34A853] uppercase tracking-widest block font-bold">
              // 05. Campus Architecture &amp; Nodes
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tight">
              3大都市を結ぶ、自律ネットワーク。
            </h2>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl">
              東京コクーンタワー、大阪梅田、名古屋駅前。物理的な距離を超え、全講義室とラウンジを常時低遅延ストリーミングで同期して活動しています。
            </p>
          </div>

          {/* Campus Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 shrink-0">
            {CAMPUSES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeId === c.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c.name.replace(' Campus', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Campus Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Architectural Image Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900/60 border border-white/15 p-2 sm:p-4 relative overflow-hidden group">
            <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden border border-white/10">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span
                  className="text-[11px] font-mono font-bold px-3 py-1 text-slate-900 uppercase"
                  style={{ backgroundColor: current.color }}
                >
                  {current.badge}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5" style={{ color: current.color }} />
                  <span>{current.location}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">{current.kanjiName}</h3>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-mono">
              <div className="p-3 bg-white/5 border border-white/5">
                <span className="text-slate-500 block text-[10px]">FACILITY</span>
                <span className="text-white font-medium">{current.specs.altitude}</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/5">
                <span className="text-slate-500 block text-[10px]">CORE FOCUS</span>
                <span className="text-white font-medium truncate block">{current.specs.focus}</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/5">
                <span className="text-slate-500 block text-[10px]">CAPACITY</span>
                <span className="text-white font-medium">{current.specs.capacity}</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/5">
                <span className="text-slate-500 block text-[10px]">TRANSIT</span>
                <span className="text-white font-medium">{current.specs.transit}</span>
              </div>
            </div>
          </div>

          {/* Right: Team Leadership & Active Tracks (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" style={{ color: current.color }} />
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Campus Profile
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Student Leads */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
                <Users2 className="w-4 h-4 text-[#4285F4]" />
                <span>Student Steering Committee</span>
              </div>
              <div className="space-y-2">
                {current.team.map((member, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{member.name}</span>
                        <span className="text-[10px] text-slate-500">({member.grade})</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{member.focus}</div>
                    </div>
                    <span className="text-[10px] uppercase text-[#4285F4] bg-[#4285F4]/10 px-2 py-0.5 font-bold">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Tracks */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
                <Code className="w-4 h-4 text-[#FBBC04]" />
                <span>Active Research &amp; Dev Tracks</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {current.activeTracks.map((trk, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono text-slate-300 bg-white/5 border border-white/15 px-3 py-1.5 flex items-center gap-1.5"
                  >
                    <Compass className="w-3 h-3 text-[#34A853]" />
                    <span>{trk}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
