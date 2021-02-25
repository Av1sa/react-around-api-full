const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils/utils");
const { UnauthorizedError } = require("../errors/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization Required no auth");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new UnauthorizedError("Authorization Required try cath");
  }

  req.user = payload;
  next();
};
