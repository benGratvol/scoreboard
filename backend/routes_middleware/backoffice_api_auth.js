const Loger = require("../utils/loger");
const apiconfing = require("../configs/backoffice_api_config");

module.exports = (req, res, next) => {
  if (req.params.key === apiconfing.Secret) {
    const msg = `Auth check api : ${req.params.key} conected to api  path : ${req.url} `;
    Loger.log(msg);
    next();
  } else {
    res.status(500).json({ msg: "forbidin" });
    const reqIP = req.connection.remoteAddress;
    const ip = reqIP.replace("::ffff:", "");
    const msg = `Auth Admin Fail check from ip : ${ip} path : ${req.url}`;
    Loger.errlog(msg);
  }
};
