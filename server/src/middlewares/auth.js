const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");

const verifyToken = async (req, res, next) => {
  const hasParamToken = req.params.token;
  const bearerHeader = hasParamToken ? `Bearer ${req.params.token}` : req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    //split the space at the bearer
    const bearer = bearerHeader.split(" ");
    //Get token from string
    const bearerToken = bearer[1];

    //set the token
    const paramToken = req.params.token;
    req.token = paramToken || bearerToken;
    const token = paramToken || bearerToken;

    if (!token) {
      return res.status(401).send(AppError("Authentication required"))
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findOne({ where: { id: decoded.user_id } });
    } catch (err) {
      return res.status(401).send(AppError("Invalid Token"))
    }

    //next middleweare
    return next();
  } else {
    //Fobidden
    return res.status(403).send(AppError("Authentication required"))
  }
};

module.exports = verifyToken;
