require("dotenv").config();
const { mongo, default: mongoose } = require("mongoose");
const Movie = require("./models/movie");
const movie = require("./models/movie");
const moviesjson = require("./movies.json")

const start = async () => {
  try {
    // ccoonects to the Db
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
    console.log("Deleting...");
    // deletes the previous movies in the Db
    await Movie.deleteMany()
    console.log("Previous ones deleted");
    console.log("uploading...");
    // uploads the movies from the moviejson
    await movie.create(moviesjson);

    console.log("Movie Uploaded Successfully");
    // breaks the terminal when it is done
    process.exit(0);
  } catch (error) {
    console.log(error);

    console.log("unable to connect");
    process.exit(1);
  }
};

start();
