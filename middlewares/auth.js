const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(customError("No Token Provided", 401));
  }
  const token = authHeader.split(" ")[1];

  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payLoad.userID };
    next();
  } catch (error) {
    return next(customError("Unauthorized", 401));
  }
};

module.exports = auth;
