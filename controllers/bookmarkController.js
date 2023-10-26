const Movie = require("../models/movie");
const customError = require("../utils/customError");

const allBookmarks = async (req, res) => {
  const { userID } = req.user;
  const bookmarks = await Movie.find({ bookmarkedBy: userID });
  res.status(200).json({
    data: bookmarks,
  });
};

const addBookmark = async (req, res, next) => {
  const { id } = req.params;
  const { userID } = req.user;

  const movie = await Movie.findOneAndUpdate(
    { _id: id },
    { $push: { bookmarkedBy: userID } }
  );
  if (!movie) {
    return next(customError(`No Movie with ID:${id}`, 400));
  }
  res.status(200).json({
    message: "Movie Bookmarked",
  });
};

const removeBookmark = async (req, res, next) => {
  const { id } = req.params;
  const { userID } = req.user;

  //   ==============================================================

  const hasBeenBookmarked = await Movie.findOne({
    _id: id,
    bookmarkedBy: userID,
  });

  if (!hasBeenBookmarked) {
    return next(customError("you havent bookmarked this", 400));
  }

  const movie = await Movie.findOneAndUpdate(
    { _id: id },
    { $pull: { bookmarkedBy: userID } }
  );
  if (!movie) {
    return next(customError(`No Movie with ID:${id}`, 400));
  }
  res.status(200).json({
    message: "remove bookmark",
  });
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
