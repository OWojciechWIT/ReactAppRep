const jwt = require("jsonwebtoken");

const HttpError = require("../utils/http-error");

const decodedToken = jwt.verify(token, process.env.JWT_KEY);

module.exports = (request, response, next) => {
  if (request.method === "OPTIONS") {
    return next();
  }
  try {
    const token = request.headers.authorization.split(" ")[1]; 
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "very_secret_private_key");
    request.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};