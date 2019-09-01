const express = require("express");
const bodyparser = require("body-parser");
const mongo_db = require("./DBs/mongo_db");
// ----------------- routes -----------------------
const auth_routes = require("./routes/auth_routes");
const creat_routes = require("./routes/creat_routes");
const stats_routes = require("./routes/stats_routes");
const backoffice_routes = require("./routes/backoffice_routes");
const aff_routes = require("./routes/aff_routes");
const brand_routes = require("./routes/brand_routes");
const prosseor_routes = require("./routes/prosseor_routes");
const exporttofile_routes = require("./routes/exporttofile_routes");
const whitlis_routes = require("./routes/whitlis_routes");
// ----------------- end of routes ----------------

const Loger = require("./utils/loger");

const HttpPort = 3200;

const server = express();
server.use(bodyparser.json());

const requir_files = [
  auth_routes,
  creat_routes,
  stats_routes,
  backoffice_routes,
  aff_routes,
  brand_routes,
  prosseor_routes,
  exporttofile_routes,
  whitlis_routes
];
[
  "/login",
  "/users",
  "/stats",
  "/backoffice",
  "/setings",
  "/setings",
  "/setings",
  "/export",
  "/blacklist"
].map((url, index) => {
  server.use(url, requir_files[index]);
});

server.listen(HttpPort, () => {
  msg = `Server Running on port : ${HttpPort}`;
  Loger.log(msg);
});
