const mongoose = require("mongoose");
const processSchema = mongoose.Schema;

const processors = new processSchema({
  processors: {
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
module.exports = mongoose.model("processors", processors);
