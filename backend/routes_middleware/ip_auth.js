const ip_DB = require("../schemas/ipwhitelist_schema");
const Loger = require("../utils/loger");

module.exports = async (req, res, next) => {
  const reqIP = req.connection.remoteAddress;
  const ip = reqIP.replace("::ffff:", "");
  const ipwhitelist = await ip_DB.find({ ip: ip, active: true });
  if (ipwhitelist <= 0) {
    res.status(403).send("Forbidden");
    const msg = `Auth IP  Fail check from ip : ${reqIP} path : ${req.url}`;
    Loger.errlog(msg);
  } else {
    next();
  }
};
