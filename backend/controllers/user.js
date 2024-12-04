const User = require("../models/user");
const { getToken } = require("../utils/auth");

function signUpUser(req, res) {
  const { name, username, password, email } = req.body;
  User.create({ name, username, password, email })
    .then((user) => {
      res.status(201).send({
        user,
        status: "success",
        message: "user created successfully !",
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: err,
        message: "Failed to create user",
      });
    });
}

function loginUser(req, res) {
  const { username, password } = req.body;
  User.find({ username, password })
    .then((user) => {
      if (!user || user.length === 0)
        return res.status(401).send({
          message: "user credentials do not match any account",
        });
      console.log("User : ", user);
      const token = getToken(user);
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          priority: "High",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          expires,
        })
        .send({
          token,
          status: "success",
          message: "User logged in successfully",
        });
    })
    .catch((err) => {
      console.log(err);
      return res.send({ message: "User login failed...", ...err });
    });
}

function getUsers(req, res) {
  User.find({})
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send({ message: err });
    });
}

function updateUser(req, res) {
  const { id, ...rest } = req.body;
  User.findByIdAndUpdate(id, rest)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send({ message: err });
    });
}

function deleteUser(req, res) {
  const { id } = req.body;
  User.findByIdAndDelete(id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send({ message: err });
    });
}

module.exports = { signUpUser, loginUser, getUsers, updateUser, deleteUser };
