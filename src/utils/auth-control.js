const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader;
  if (token === null || token === undefined) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, "çokgizlibişeyler", (err, information) => {
    if (err) return res.sendStatus(403);
    const infArr = information.split("__");
    req.user = infArr[0];
    req.role = infArr[1];
    next(); // pass the execution off to whatever request the client intended
  });
}

module.exports = authenticateToken;
