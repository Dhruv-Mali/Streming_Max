/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

export default function Movie({ data }: { data: any }) {
  const router = useRouter();
  function handleClick(id: string) {
    router.push(`/movies/${id}`);
  }
  return (
    <>
      <div
        key={data.movie_id}
        className="relative shadow-md rounded-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer"
      >
        <img
          className=" w-auto object-contain border-2 border-gray-200 rounded-lg hover:bg-black hover:bg-opacity-50 transition duration-500 ease-in-out"
          src={data.images[0].image_url}
          alt={data.title}
          onClick={() => handleClick(data.movie_id)}
        />
      </div>
    </>
  );
}
