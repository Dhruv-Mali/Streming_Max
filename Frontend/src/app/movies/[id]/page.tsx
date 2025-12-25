import { Suspense } from "react";
import api from "@/utils/api";
import { MovieContent } from "@/components/MovieContent";
import { Movie } from "@/types";

export async function generateStaticParams() {
  try {
    const response = await api.get("content/movies/all");
    const movies = response.data;
    return movies.map((movie: { movie_id: any }) => ({
      id: movie.movie_id.toString(),
    }));
  } catch (err) {
    // If the backend is not available during build, avoid failing the whole build
    // by returning an empty params list. Pages will be rendered on demand.
    console.error("generateStaticParams: failed to fetch movies:", err);
    return [];
  }
}

export default async function MoviePage({
  params,
}: {
  params: { id: number };
}) {
  try {
    const response = await api.get(`content/movies/${params.id}`);
    const movie: Movie = response.data;

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <MovieContent movie={movie} />
      </Suspense>
    );
  } catch (err) {
    console.error("MoviePage: failed to fetch movie:", err);
    return <div className="p-4">Movie data is currently unavailable.</div>;
  }
}
