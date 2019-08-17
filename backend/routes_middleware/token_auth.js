const jwt = require("jsonwebtoken");
const JWT_config = require("../configs/JWT_config");
module.exports = (req, res, next) => {
  // headers.authorization == Token

  const token = req.headers.authorization;
  jwt.verify(token, JWT_config.Secret, function(err, payload) {
    console.log("payload", payload);
    if (payload) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  });
};
