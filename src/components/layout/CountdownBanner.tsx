"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import type { CountdownData } from "@/types";
import { getCountdownData } from "@/lib/countdown";

export default function CountdownBanner() {
  const [data, setData] = useState<CountdownData | null>(null);

  useEffect(() => {
    setData(getCountdownData());
  }, []);

  if (!data) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-6">
        <div className="h-[160px] rounded-lg bg-gray-light animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-8 mt-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 rounded-lg overflow-hidden text-white text-center">
        <div className="bg-green-primary p-4 lg:p-6 flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-widest mb-1">DIAS PASSADOS</span>
          <span className="text-4xl lg:text-5xl font-bold font-headline">{data.daysElapsed}</span>
        </div>
        <div className="bg-green-light p-4 lg:p-6 flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-widest mb-1 text-green-primary font-bold">
            {data.progressPercentage}%
          </span>
          <span className="text-sm uppercase tracking-wider text-green-primary">do ciclo</span>
        </div>
        <div className="bg-yellow p-4 lg:p-6 flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-widest mb-1">FALTAM</span>
          <span className="text-4xl lg:text-5xl font-bold font-headline">{data.daysRemaining}</span>
          <span className="text-xs uppercase tracking-wider">dias para 2030</span>
        </div>
        <div className="bg-blue-primary p-4 lg:p-6 flex flex-col items-center justify-center">
          <Trophy size={28} className="mb-1" />
          <span className="text-xs uppercase tracking-widest">Copa do Mundo 2030</span>
          <span className="text-sm font-bold">11 JUN 2030</span>
        </div>
      </div>
    </div>
  );
}
