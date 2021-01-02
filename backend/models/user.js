const mongoose = require("mongoose");
const { regex } = require("../utils/utils");
const validator = require("validator");
const { defaultUser } = require("../utils/utils");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: defaultUser.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: defaultUser.about,
  },
  avatar: {
    type: String,
    validate: {
      validator: (link) => regex.test(link),
    },
    default: defaultUser.avatar,
  },
});

module.exports = mongoose.model("user", userSchema);
