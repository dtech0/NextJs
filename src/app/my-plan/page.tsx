"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X, Dumbbell, ArrowRight, ChevronDown } from "lucide-react";
import { usePlan } from "@/context/contextPlan";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  const { todayPlan, savedPlan, doneIds, removeFromPlan, removeFromSaved, toggleDone } = usePlan();

  const currentList = activeTab === "today" ? todayPlan : savedPlan;

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = currentList.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full">
      
      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#12141a] border border-[#1e232d] rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Exercises</span>
          <span className="text-3xl font-black text-[#ccff00] mt-2">{totalExercises}</span>
        </div>
        <div className="bg-[#12141a] border border-[#1e232d] rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Minutes</span>
          <span className="text-3xl font-black text-white mt-2">{totalMinutes}</span>
        </div>
        <div className="bg-[#12141a] border border-[#1e232d] rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Calories</span>
          <span className="text-3xl font-black text-white mt-2">{totalCalories}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e232d] pb-4 mb-8">
        
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("today")}
            className={`text-sm font-black uppercase tracking-wider pb-2 transition-colors cursor-pointer relative ${
              activeTab === "today" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
            {activeTab === "today" && (
              <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#ccff00]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`text-sm font-black uppercase tracking-wider pb-2 transition-colors cursor-pointer relative ${
              activeTab === "saved" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
            {activeTab === "saved" && (
              <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#ccff00]" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <label htmlFor="sortPlan" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Sort By:
          </label>
          <div className="relative">
            <select
              id="sortPlan"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
              className="appearance-none bg-[#12141a] text-white border border-[#1e232d] text-xs font-bold uppercase tracking-wider py-2 pl-3.5 pr-8 rounded-xl focus:outline-none focus:border-[#ccff00] cursor-pointer hover:border-gray-500 transition-colors"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

      </div>

      {sortedList.length === 0 ? (
        <div className="bg-[#12141a] border border-[#1e232d] rounded-3xl p-12 text-center flex flex-col items-center justify-center my-6">
          <div className="w-16 h-16 rounded-full bg-[#1a1d26] flex items-center justify-center mb-4">
            <Dumbbell className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-black uppercase text-white tracking-wide mb-2">
            NOTHING HERE YET
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-sm mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/#library"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
          >
            <span>Go to workouts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedList.map((workout) => {
            const isDone = doneIds.includes(workout.id);

            return (
              <div
                key={workout.id}
                className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#12141a] border transition-all duration-300 ${
                  isDone ? "border-[#ccff00]/40 opacity-75" : "border-[#1e232d] hover:border-gray-500"
                }`}
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#090a0d] shrink-0 border border-[#1e232d]">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className={`text-base font-extrabold uppercase tracking-wide transition-all ${isDone ? "line-through text-gray-500" : "text-white"}`}>
                      {workout.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{workout.equipment}</p>

                    <div className="flex items-center gap-4 text-[11px] text-gray-400 mt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-gray-400" />
                        <span>{workout.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-gray-400" />
                        <span>{workout.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-[#1e232d]">
                  
                  <Link
                    href={`/workout/${workout.id}`}
                    className="px-4 py-2.5 rounded-xl border border-[#1e232d] bg-[#1a1d26] text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:border-[#ccff00]/60 transition-colors"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" && (
                    <button
                      onClick={() => toggleDone(workout.id)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                        isDone
                          ? "bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/10"
                          : "border border-[#1e232d] bg-[#1a1d26] text-gray-300 hover:text-white hover:border-gray-500"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{isDone ? "Done" : "Mark Done"}</span>
                    </button>
                  )}

                  <button
                    onClick={() =>
                      activeTab === "today"
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    className="p-2.5 rounded-xl border border-[#1e232d] bg-[#1a1d26] text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Remove workout"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </main>
  );
}
