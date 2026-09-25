import Link from "next/link";
import { Dumbbell, Home, ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <main className="flex-1 min-h-[70vh] flex items-center justify-center bg-white text-black">
      <div className="flex items-center">
        <h1 className="text-2xl font-medium tracking-tight pr-6 mr-6 border-r border-gray-300 text-black">
          404
        </h1>
        <h2 className="text-sm font-normal text-gray-700">
          This page could not be found.
    </h2>
  </div>
</main>
  );
}
