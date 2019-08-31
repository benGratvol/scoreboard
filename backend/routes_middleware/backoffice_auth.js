const jwt = require("jsonwebtoken");
const JWT_config = require("../configs/JWT_config");
const Loger = require("../utils/loger");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_config.Secret, function(err, payload) {
    if (payload.role === "support" || payload.role === "admin") {
      const msg = `Auth check BackOffice : ${payload.username} role : ${payload.role} path : ${req.url}`;
      Loger.log(msg);
      next();
    } else {
      const reqIP = req.connection.remoteAddress;
      const msg = `Auth BackOffice  Fail check from ip : ${reqIP} path : ${req.url}`;
      Loger.errlog(msg);
      res.status(403).send("Forbidden");
    }
  });
};
