"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/contextPlan";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

export default function Navbar({ planCount = 0, savedCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const { todayPlan, savedPlan } = usePlan()    

  return (
    <nav className="sticky top-0 z-50 bg-[#0c0d10]/90 backdrop-blur-md border-b border-[#232834]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3 group">
          
          <span className="text-xl font-black tracking-widest text-white uppercase">
            FIT<span >LOG</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors uppercase tracking-wider ${
              pathname === "/" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-semibold transition-colors uppercase tracking-wider ${
              pathname === "/my-plan" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#b8e600] transition-transform active:scale-95"
          >
            <span>Plan</span>
            <span className="bg-black/20 px-1.5 py-0.5 rounded-full text-[11px]">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2b303d] text-white text-xs font-bold uppercase tracking-wider hover:border-gray-400 hover:bg-white/5 transition-transform active:scale-95"
          >
            <span>Saved</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded-full text-[11px] text-gray-300">
              {savedPlan.length}
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
