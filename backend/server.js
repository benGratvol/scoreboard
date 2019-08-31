const express = require("express");
const bodyparser = require("body-parser");
const mongo_db = require("./DBs/mongo_db");

const Loger = require("./utils/loger");

const HttpPort = 3200;

const server = express();
server.use(bodyparser.json());

// ----------------- routes -----------------------
const Auth = require("./routes/auth_routes");
const Create = require("./routes/creat_routes");
const Stats = require("./routes/stats_routes");
const BackOffice = require("./routes/backoffice_routes");
const Aff = require("./routes/aff_routes");
const Brand = require("./routes/brand_routes");
const Pross = require("./routes/prosseor_routes");
const ExportFile = require("./routes/exporttofile_routes");
const BanIP = require("./routes/whitlis_routes");
// ----------------- end of routes ----------------

server.use("/login", Auth);
server.use("/users", Create);
server.use("/stats", Stats);
server.use("/backoffice", BackOffice);
server.use("/setings", Aff);
server.use("/setings", Brand);
server.use("/setings", Pross);
server.use("/export", ExportFile);
server.use("/blacklist", BanIP);

server.listen(HttpPort, () => {
  msg = `Server Running on port : ${HttpPort}`;
  Loger.log(msg);
});
