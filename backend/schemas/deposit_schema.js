const mongoose = require("mongoose");
const depositScheman = mongoose.Schema;

const Deposit = new depositScheman({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  amount_in_usd: {
    type: Number,
    required: true
  },
  agent: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  processor: {
    type: String,
    required: true
  },
  client_dor: {
    type: String,
    required: true
  },
  cid: {
    type: String,
    required: true
  },
  affiliate: {
    type: String,
    required: true
  },
  deposit_vertifi: {
    type: String,
    required: true
  },
  docs_sent: {
    type: String,
    required: true
  },
  exchangeDate: {
    type: String,
    required: true
  },
  depositDate: {
    type: String,
    required: true
  },
  depositMonth: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("deposit", Deposit);
