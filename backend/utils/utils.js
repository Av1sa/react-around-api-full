const status = require("http-status-codes");
require("dotenv").config();

const { NODE_ENV, JWT_SECRET } = process.env;

//Secret key for hashing passwords
const secretKey = NODE_ENV === "production" ? JWT_SECRET : "dev-secret";

// URL validation
const regex = /https?:\/\/(www\.)?[a-zA-Z0-9-@:%_+.~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([a-zA-Z0-9-@:%_+.~#=?&/]*)/;

//Default user
const defaultUser = {
  name: "Jacques Cousteau",
  about: "Explorer",
  avatar: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
};

module.exports = { defaultUser, regex, secretKey };
