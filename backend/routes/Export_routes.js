// ----------------- routes -----------------------

const auth_routes = require("./auth_routes");
const creat_routes = require("./creat_routes");
const stats_routes = require("./stats_routes");
const backoffice_routes = require("./backoffice_routes");
const aff_routes = require("./aff_routes");
const brand_routes = require("./brand_routes");
const prosseor_routes = require("./prosseor_routes");
const exporttofile_routes = require("./exporttofile_routes");
const whitlis_routes = require("./whitlis_routes");

// ----------------- end of routes ----------------

const allroutes = [
  {
    file: auth_routes,
    path: "/login"
  },
  {
    file: creat_routes,
    path: "/users"
  },
  {
    file: stats_routes,
    path: "/stats"
  },
  {
    file: backoffice_routes,
    path: "/backoffice"
  },
  {
    file: aff_routes,
    path: "/setings"
  },
  {
    file: brand_routes,
    path: "/setings"
  },
  {
    file: prosseor_routes,
    path: "/setings"
  },
  {
    file: exporttofile_routes,
    path: "/export"
  },
  {
    file: whitlis_routes,
    path: "/blacklist"
  }
];

module.exports = allroutes;
