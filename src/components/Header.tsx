import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import { landingPageData } from '@/data/cms';

function VwLogo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path 
        d="M 31 27 L 50 60 L 69 27" 
        stroke="currentColor" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 23 27 L 40 75 L 50 54 L 60 75 L 77 27" 
        stroke="currentColor" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

export default function Header() {
  const zaloUrl = landingPageData.consultant.zaloUrl || `https://zalo.me/${landingPageData.dealership.hotline.replace(/\s+/g, '')}`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-slate-950/85 border-b border-white/10 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Dealership Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-1 rounded-full bg-white/5 border border-white/10 group-hover:border-blue-400/50 group-hover:bg-blue-500/10 transition-all duration-300 shadow-md">
            <VwLogo className="w-8 h-8 text-white group-hover:text-blue-400 transition-colors duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-base sm:text-lg tracking-wider group-hover:text-blue-400 transition-colors uppercase font-mono">
              Volkswagen
            </span>
            <span className="text-xs text-slate-400 tracking-widest uppercase -mt-1 font-sans">
              Nghệ An
            </span>
          </div>
        </Link>

        {/* Right: Zalo & Hotline Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Zalo Button */}
          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-600/90 hover:bg-blue-500 border border-blue-400/40 text-white transition-all duration-300 shadow-md shadow-blue-600/20 group text-xs sm:text-sm font-semibold"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <span>Zalo</span>
          </a>

          {/* Hotline Button */}
          <a 
            href={`tel:${landingPageData.dealership.hotline}`}
            className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-400/30 text-white transition-all duration-300 shadow-md shadow-emerald-500/10 group text-xs sm:text-sm font-semibold"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="hidden sm:inline">
              Hotline: {landingPageData.dealership.hotline}
            </span>
            <span className="sm:hidden">Gọi</span>
          </a>
        </div>
      </div>
    </header>
  );
}
