import api from "@/utils/api";
import React from "react";
import Movie from "./Movie";
import { Film, Sparkles } from "lucide-react";

export default async function Page() {
  let movies: any[] = [];
  try {
    const response = await api.get("content/movies/all");
    movies = response.data || [];
  } catch (err) {
    console.error("/movies page: failed to fetch movies:", err);
    movies = [];
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-purple-950/5 to-background">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 md:px-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-violet-600/10 to-indigo-600/10 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Latest Collection</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Explore Movies
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest blockbusters and timeless classics on Stremify
          </p>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="px-4 md:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {movies.map((movie: any) => (
                <Movie key={movie.movie_id} data={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Film className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">No movies available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
