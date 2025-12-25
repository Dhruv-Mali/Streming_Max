import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    release_year: {
      type: Number,
      required: [true, "Release year is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    synopsis: {
      type: String,
      required: [true, "Synopsis is required"],
    },
    age_rating: {
      type: String,
      required: [true, "Age rating is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    actors: {
      type: String,
      required: [true, "Actors are required"],
    },
    warnings: {
      type: String,
      required: [true, "Warnings are required"],
    },
    images: [
      {
        image_url: {
          type: String,
          required: true,
        },
        image_type: {
          type: String,
          enum: ["poster", "backdrop"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.movie_id = ret._id;
        ret.created_at = ret.createdAt;
        ret.updated_at = ret.updatedAt;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

export default mongoose.model("Movie", movieSchema);
