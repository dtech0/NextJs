import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export default async function Library() {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });
  const workouts: Workout[] = await res.json();

  return (
    <section id="library" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-wide">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.slice(0,12).map((work) => (
            <Link
              key={work.id}
              href={`/workout/${work.id}`}
              className="group flex flex-col bg-[#12141a] border border-[#1e232d] rounded-2xl p-4 hover:border-gray-500 transition-all duration-300"
            >
              
              <div className="relative w-full h-52 bg-[#090a0d] rounded-xl overflow-hidden mb-4">
                <Image
                  src={work.image}
                  alt={work.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {work.muscleGroups.map((group, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#ccff00] text-black"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <h3 className="text-base font-extrabold uppercase text-white tracking-wide group-hover:text-[#ccff00] transition-colors line-clamp-1">
                {work.name}
              </h3>

              <p className="text-xs text-gray-400 mt-1 mb-4 line-clamp-1">
                {work.equipment}
              </p>

              <div className="mt-auto pt-3 border-t border-[#1e232d] flex items-center gap-4 text-[11px] text-gray-400">
                
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{work.duration} min</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-gray-400" />
                  <span>{work.caloriesBurned} kcal</span>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-gray-400" />
                  <span>{work.rating}</span>
                </div>

              </div>

            </Link>
          ))}
        </div>

    </section>
  );
}
