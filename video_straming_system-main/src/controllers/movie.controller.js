import Movie from "../models/movie.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import { uploadToS3 } from "../utils/s3Upload.js";
import config from "../config/index.js";

export const getAllMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({}).sort({ createdAt: -1 });
  res.status(200).json(movies);
});

export const getMovieById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  if (!movie) {
    throw new CustomError("Movie not found", 404);
  }

  res.status(200).json(movie);
});

export const createMovie = asyncHandler(async (req, res) => {
  const { title, releaseYear, duration, synopsis, ageRating, genre, actors, warnings } = req.body;

  if (!title || !releaseYear || !duration || !synopsis || !ageRating || !genre || !actors || !warnings) {
    throw new CustomError("All fields are required", 400);
  }

  const images = [];
  
  if (req.files && req.files.length > 0) {
    // Use S3 if enabled, otherwise use local storage
    if (config.USE_S3) {
      // Upload to S3
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const s3Result = await uploadToS3(file);
        
        images.push({
          image_url: s3Result.url,
          image_type: i === 0 ? "poster" : "backdrop",
        });
      }
    } else {
      // Use local storage
      req.files.forEach((file, index) => {
        images.push({
          image_url: `/uploads/${file.filename}`,
          image_type: index === 0 ? "poster" : "backdrop",
        });
      });
    }
  }

  const movie = await Movie.create({
    title,
    release_year: releaseYear,
    duration,
    synopsis,
    age_rating: ageRating,
    genre,
    actors,
    warnings,
    images,
  });

  res.status(201).json({
    success: true,
    message: "Movie created successfully",
    movie,
  });
});

export const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    throw new CustomError("Movie not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Movie updated successfully",
    movie,
  });
});

export const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndDelete(id);

  if (!movie) {
    throw new CustomError("Movie not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Movie deleted successfully",
  });
});
