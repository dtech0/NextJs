"use client";

import { Plus, Bookmark } from "lucide-react";
import { Workout } from "@/component/library";
import { usePlan } from "@/context/contextPlan";

export default function WorkoutActionButtons({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved } = usePlan();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 mt-auto">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border border-[#ccff00] bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:border-gray-500 hover:bg-[#ccff00e1] transition-colors cursor-pointer active:scale-95"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>Add to today&apos;s plan</span>
      </button>

      <button
        type="button"
        onClick={() => addToSaved(workout)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border border-[#1e232d] bg-[#12141a] text-white font-extrabold text-xs uppercase tracking-wider hover:border-gray-500 hover:bg-[#1a1d26] transition-colors cursor-pointer active:scale-95"
      >
        <Bookmark className="w-4 h-4" />
        <span>Save for later</span>
      </button>
    </div>
  );
}
