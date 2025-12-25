"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthStore } from "./AuthProvider";
import { Movie } from "@/types";
import Link from "next/link";

export function MovieContent({ movie }: { movie: Movie }) {
  const { isLoggedIn, fetchAuth, user } = useAuthStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoggedIn) {
        await fetchAuth();
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [isLoggedIn, fetchAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const backdropImage =
    movie.images.find((image) => image.image_type === "backdrop")?.image_url ||
    "";

  return (
    <div className="relative mt-4 min-h-screen flex flex-col text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={backdropImage}
          alt={`${movie.title} backdrop`}
          layout="fill"
          objectFit="cover"
          className="opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-90"></div>
      </div>

      <div className="relative z-10 flex-grow container mx-auto px-4 py-16 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-start">
          <MoviePoster movie={movie} />
          <MovieDetails movie={movie} />
        </div>
      </div>
      {user?.role === "subscriber" || user?.role === "admin" ? (
        <StartWatchingSection />
      ) : (
        <JoinNowSection />
      )}

      <AdditionalInfo movie={movie} />
    </div>
  );
}

function MoviePoster({ movie }: { movie: Movie }) {
  const posterImage =
    movie.images.find((image) => image.image_type === "poster")?.image_url ||
    "";

  return (
    <div className="md:w-1/3 mb-8 md:mb-0">
      <Image
        src={posterImage}
        alt={`${movie.title} poster`}
        width={300}
        height={450}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}

function MovieDetails({ movie }: { movie: Movie }) {
  return (
    <div className="md:w-2/3 md:pl-8">
      <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{movie.title}</h1>
      <div className="flex items-center mb-4">
        <span className="bg-yellow-500 text-black font-bold px-2 py-1 rounded mr-2">
          {movie.age_rating}
        </span>
        <span>{movie.release_year}</span>
        <span className="mx-2">•</span>
        <span>{`${movie.duration} minutes`}</span>
      </div>
      <p className="text-xl mb-6 leading-relaxed">{movie.synopsis}</p>
      <GenresList genres={movie.genres} />
      <ActorsList actors={movie.actors} />
    </div>
  );
}

function GenresList({ genres }: { genres: Movie["genres"] }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">Genres</h2>
      <div className="flex flex-wrap">
        {genres.map((genre) => (
          <span
            key={genre.genre_id}
            className="bg-gray-800 text-sm px-3 py-1 rounded-full mr-2 mb-2 drop-shadow-lg"
          >
            {genre.genre_name}
          </span>
        ))}
      </div>
    </div>
  );
}

function ActorsList({ actors }: { actors: Movie["actors"] }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">Starring</h2>
      <div className="flex flex-wrap">
        {actors.map((actor) => (
          <span
            key={actor.actor_id}
            className="bg-gray-800 text-sm px-3 py-1 rounded-full mr-2 mb-2 drop-shadow-lg"
          >
            {actor.actor_name}
          </span>
        ))}
      </div>
    </div>
  );
}

function JoinNowSection() {
  return (
    <div className="relative z-20 py-12 mb-12">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-lg overflow-hidden">
          <div className="max-w-4xl mx-auto px-8 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-4xl font-bold">Ready to watch?</h2>
                <p className="text-xl mt-2">
                  Join now to start streaming this movie and more.
                </p>
              </div>
              <Link href="/pricing">
                <button
                  className="bg-white text-red-600 hover:bg-gray-200 font-bold py-3 px-8 rounded-md text-xl transition duration-300"
                  aria-label="Join Now"
                >
                  Join Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StartWatchingSection() {
  return (
    <div className="relative z-20 py-12 mb-12">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg shadow-lg overflow-hidden">
          <div className="max-w-4xl mx-auto px-8 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-4xl font-bold">Ready to watch?</h2>
                <p className="text-xl mt-2">Start streaming this movie now!</p>
              </div>
              <button
                className="bg-white text-green-600 hover:bg-gray-200 font-bold py-3 px-8 rounded-md text-xl transition duration-300"
                aria-label="Start Watching"
              >
                Start Watching
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdditionalInfo({ movie }: { movie: Movie }) {
  if (!movie?.additional_info) {
    return (
      <div className="text-center text-white">
        No additional information available.
      </div>
    );
  }

  return (
    <div className="relative z-10 py-12 bg-black bg-opacity-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">More Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InfoItem label="Director" value={movie.additional_info.director} />
          <InfoItem
            label="Original Title"
            value={movie.additional_info.original_title}
          />
          <InfoItem
            label="Origin Country"
            value={movie.additional_info.origin_country}
          />
          <InfoItem
            label="Country Certification"
            value={movie.additional_info.origin_country_certification}
          />
          <InfoItem
            label="Production Companies"
            value={movie.additional_info.production_companies.join(", ")}
          />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-1">{label}</h3>
      <p className="text-gray-300">{value}</p>
    </div>
  );
}
