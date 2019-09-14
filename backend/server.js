const express = require("express");
const bodyparser = require("body-parser");
const Loger = require("./utils/loger");
const mongo_db = require("./DBs/mongo_db");

// ----------------- routes -----------------------
const Allroutes = require("./routes/Export_routes");
// ----------------- end of routes ----------------

const HttpPort = 3200;

const server = express();
server.use(bodyparser.json());

Allroutes.map(route => {
  server.use(route.path, route.file);
});

server.listen(HttpPort, () => {
  msg = `Server Running on port : ${HttpPort}`;
  Loger.log(msg);
});
