const jwt = require("jsonwebtoken");

const getToken = (user) => {
  const tokenObj = {
    _id: user[0]._id,
    username: user[0].username,
  };
  console.log("User Token : ", tokenObj);
  return jwt.sign(tokenObj, process.env.JWT_PRIVATE_KEY);
};

const getUser = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = {getToken, getUser};