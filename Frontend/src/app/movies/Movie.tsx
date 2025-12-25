/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { Play, Star } from "lucide-react";
import { useState } from "react";

export default function Movie({ data }: { data: any }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  function handleClick(id: string) {
    router.push(`/movies/${id}`);
  }
  
  return (
    <div
      className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(data.movie_id)}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-purple-900/20 to-violet-900/20">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={data.images[0].image_url}
          alt={data.title}
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="p-4 rounded-full bg-purple-600 shadow-2xl shadow-purple-500/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-8 w-8 text-white fill-white" />
          </div>
        </div>
        
        {/* Title on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 drop-shadow-lg">
            {data.title}
          </h3>
          {data.release_year && (
            <p className="text-gray-300 text-xs mt-1">{data.release_year}</p>
          )}
        </div>
      </div>
      
      {/* Border Glow Effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-500/50 transition-colors duration-300"></div>
    </div>
  );
}
