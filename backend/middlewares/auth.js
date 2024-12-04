const { getUser } = require("../utils/auth");

exports.checkAuth = (req, res, next) => {
  const cookieToken = req.cookies.token;
  const headerBearerToken = req.headers.authorization ?? "";
  const headerToken = headerBearerToken?.split("Bearer ")[1] ?? "";
  const user = getUser(cookieToken || headerToken);
  if (user) {
    req.user = user;
    next();
  } else {
    return res.status(401).send({ message: "Unauthorized access" });
  }
};