const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const DB_con = require("./configs/db_config");

const HttpPort = 3200;

const server = express();
server.use(bodyparser.json());

// ----------------- routes -----------------------
const Auth = require("./routes/auth_routes");
const Create = require("./routes/creat_routes");
const Stats = require("./routes/stats_routes");
const BackOffice = require("./routes/backoffice_routes");
const Aff = require("./routes/aff_routes");
const Pross = require("./routes/prosseor_routes");
// ----------------- end of routes ----------------

//---------- DB SetUp -------------
mongoose.connect(DB_con.db_name, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Sucsses on DB Conection");
});
// ---------------------------------

server.use("/login", Auth);
server.use("/users", Create);
server.use("/stats", Stats);
server.use("/backoffice", BackOffice);
server.use("/setings", Aff);
server.use("/setings", Pross);

server.listen(HttpPort, () => {
  console.log(`Server Running on port : ${HttpPort}`);
});
