const mongoose = require("mongoose");
const brandSchema = mongoose.Schema;

const Brand = new brandSchema({
  brandname: {
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
module.exports = mongoose.model("Brand", Brand);
