export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "guest" | "subscriber";
  verified: boolean;
}

export interface Movie {
  title: string;
  synopsis: string;
  release_year: number;
  duration: number;
  age_rating: string;
  genres: Array<{ genre_id: number; genre_name: string }>;
  actors: Array<{ actor_id: number; actor_name: string }>;
  images: Array<{ image_type: string; image_url: string }>;
  additional_info: {
    origin_country: string;
    original_title: string;
    origin_country_certification: string;
    production_companies: Array<string>;
    director: string;
  };
}
