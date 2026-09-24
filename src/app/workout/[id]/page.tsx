import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus, Bookmark } from "lucide-react";
import { Workout } from "@/component/library";
import WorkoutActionButtons from "@/component/WorkoutActionButtons";

interface DetailsProps {
  params: Promise<{ id: string }>;
}

const details = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });
  const workout: Workout[] = await res.json();
  return workout;
};

export default async function WorkoutDetail({ params }: DetailsProps) {
  const { id } = await params;
  const workout = await details();
  const result = workout.find((work) => work.id === Number(id));

  if (!result) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 mb-8">
      
      <Link
        href="/#library"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative w-full h-full min-h-[480px] bg-[#12141a] border border-[#1e232d] rounded-2xl overflow-hidden p-4 shadow-2xl">
            <div className="relative w-full h-full min-h-[440px] rounded-xl overflow-hidden">
              <Image
                src={result.image}
                alt={result.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-wrap gap-2">
              {result.muscleGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#ccff00] text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                {result.name}
              </h1>
              <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-[#12141a] border border-[#1e232d] rounded-2xl p-5">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#ccff00] mb-4">
                KEY SPECS
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs">
                <div>
                  <span className="text-gray-500 uppercase block font-semibold mb-1">Equipment</span>
                  <span className="text-white font-bold">{result.equipment}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase block font-semibold mb-1">Difficulty</span>
                  <span className="text-white font-bold">{result.difficulty}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase block font-semibold mb-1">Sets</span>
                  <span className="text-white font-bold">{result.sets}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase block font-semibold mb-1">Reps</span>
                  <span className="text-white font-bold">{result.reps}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase block font-semibold mb-1">Duration</span>
                  <span className="text-white font-bold">{result.duration} min</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase block font-semibold mb-1">Calories</span>
                  <span className="text-white font-bold">{result.caloriesBurned} kcal</span>
                </div>
              </div>
            </div>

            <div className="bg-[#12141a] border border-[#1e232d] rounded-2xl p-5">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#ccff00] mb-4">
                INSTRUCTIONS
              </h2>
              <ol className="flex flex-col gap-3">
                {result.instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-[#1e232d] text-[#ccff00] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 mt-auto">
           <WorkoutActionButtons workout={result} />
          </div>

        </div>

      </div>
    </main>
  );
}
