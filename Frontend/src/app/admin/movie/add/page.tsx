"use client";
import { MovieForm, MovieFormData } from "@/components/AddMovieForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/Toast";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1",
  headers: {
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_URL,
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default function Page() {
  const router = useRouter();

  const onSubmit = async (data: MovieFormData) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("releaseYear", data.releaseYear);
      formData.append("duration", data.duration);
      formData.append("synopsis", data.synopsis);
      formData.append("ageRating", data.ageRating);
      formData.append("genre", data.genre);
      formData.append("actors", data.actors);
      formData.append("warnings", data.warnings);
      formData.append("images", data.poster);
      formData.append("images", data.backdrop);

      console.log(formData);
      const response = await api.post("/content/movies", formData);

      if (response.status === 201) {
        Toast({
          variant: "default",
          title: "Success",
          description: "Movie added successfully.",
        });
        router.push("/admin/movie");
      } else {
        throw new Error(response.data.message);
      }
      console.log(data);
    } catch (error: any) {
      console.error(error);
      Toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className=" px-10 py-20">
      <Toaster />
      <MovieCardComponent
        title="Add a Movie"
        description="Enter the details of the movie below to add it to the database."
      >
        <MovieForm onSubmit={onSubmit} />
      </MovieCardComponent>
    </div>
  );
}

type CardComponentProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function MovieCardComponent({
  title,
  description,
  children,
}: CardComponentProps) {
  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
