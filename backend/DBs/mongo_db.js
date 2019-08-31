const mongoose = require("mongoose");
const DB_con = require("../configs/db_config");
const Loger = require("../utils/loger");

mongoose.connect(DB_con.db_name, {
  useNewUrlParser: true,
  useFindAndModify: false
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  Loger.log("Sucsses on DB Conection");
});

module.exports = mongoose;
