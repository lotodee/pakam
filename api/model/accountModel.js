// models/Account.js
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true,sparse: true  },
  accountName: { type: String, required: true },
  accountBalance: { type: Number, required: true ,default:0 },
  transactions: [
    {
      date: { type: Date, required: true },
      amount: { type: Number, required: true },
      type: { type: String, required: true }, // "deposit" or "withdrawal"
      description: { type: String, required: true }, // "deposit" or "withdrawal"
    },
 
  ],
});

module.exports = mongoose.model("Account", accountSchema);
