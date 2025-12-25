import { Router } from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";
import { isLoggedIn } from "../middleware/auth.middlerware.js";
import multer from "multer";
import path from "path";

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/all", getAllMovies);
router.get("/:id", getMovieById);
router.post("/", isLoggedIn, upload.array("images", 2), createMovie);
router.put("/:id", isLoggedIn, updateMovie);
router.delete("/:id", isLoggedIn, deleteMovie);

export default router;
