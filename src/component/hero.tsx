import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-4 sm:px-8 max-w-7xl mx-auto pt-8 pb-4">
      <div className="bg-[#12141a] border border-[#1e232d] rounded-2xl sm:rounded-3xl p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        <div className="flex flex-col items-start">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#ccff00] uppercase mb-4">
            WORKOUT LIBRARY
          </span>

          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[1.05] mb-4">
            TRAIN WITH INTENT. <br />
            LOG EVERY SET.
          </h1>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md mb-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="px-6 py-3 rounded-md bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors">
            BROWSE WORKOUTS
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Image
            src="/assets/banner.png"
            alt="FitLog Training Banner"
            width={340}
            height={340}
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}
