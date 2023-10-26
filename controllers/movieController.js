const Movie = require("../models/movie");

const allData = async (req, res) => {
  // get all movies from the db and send it as the json response
  const data = await Movie.find({});
  res.status(200).json({
    data: data,
  });
};

const allMovies = async (req, res) => {
  const movies = await Movie.find({ type: "movie" });
  res.status(200).json({
    data: movies,
  });
};
const allSeries = async (req, res) => {
  const series = await Movie.find({ type: "series" });
  res.status(200).json({
    data: series,
  });
};

module.exports = { allData, allMovies, allSeries };
