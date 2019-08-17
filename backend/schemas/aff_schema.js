const mongoose = require("mongoose");
const affSchema = mongoose.Schema;

const Aff = new affSchema({
  affname: {
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
module.exports = mongoose.model("affiliate", Aff);
