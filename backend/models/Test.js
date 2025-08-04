import mongoose from 'mongoose';

const filmSchema = new mongoose.Schema({
  title: String,
  genre: [String],
  director: String,
  cast: [String],
  releaseYear: Number,
  synopsis: String,
  duration: String,
  posterUrl: String,
  trailerUrl: String,
  rating: Number
});

// ✅ This fixes the ES module import
const Film = mongoose.model('Film', filmSchema);
export default Film;
