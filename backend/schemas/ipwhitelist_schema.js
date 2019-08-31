const mongoose = require("mongoose");
const ipSchema = mongoose.Schema;

const IPwhitelist = new ipSchema({
  ip: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  createdDate: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("whitelist", IPwhitelist);
