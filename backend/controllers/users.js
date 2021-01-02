const User = require("../models/user");
const { secretKey } = require("../utils/utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { NotFoundError, UnauthorizedError } = require("../errors/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError("Users not found");
      }
      res.send({ data: users });
    })
    .catch(next);
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.send({ data: user });
    })
    .catch(next);
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res) => {
  const { email, password, name, avatar, about } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name, avatar, about }))
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "7d" });
      res.send({ data: user, token });
    })
    .catch((err) => {
      res.send({ message: "User with such an email already exists" });
      return next();
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError("Incorrect password or email")
        );
      }
      // console.log("password", password);
      // console.log("user.password", user.password);
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          console.log("matched", matched);
          // console.log("user", user);
          if (!matched) {
            return Promise.reject(
              new UnauthorizedError("Incorrect password or email")
            );
          }
          const token = jwt.sign({ _id: user._id }, secretKey, {
            expiresIn: "7d",
          });
          // console.log("token", token);
          res.status(200).send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateProfile,
  updateAvatar,
  loginUser,
};
