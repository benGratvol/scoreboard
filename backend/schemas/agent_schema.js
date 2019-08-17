const mongoose = require("mongoose");
const agentScheman = mongoose.Schema;

const agent = new agentScheman({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  agent: {
    type: String,
    required: true
  },
  createdDate: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("agent", agent);
