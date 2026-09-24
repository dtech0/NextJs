import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#232834] bg-[#090a0d] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        <div className="flex items-center gap-3">
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="text-sm font-black tracking-widest text-white uppercase">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </div>

        <p className="text-xs text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}
