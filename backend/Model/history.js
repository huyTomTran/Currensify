const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const historySchema = new Schema({
  date: { type: String, require: true },
  rates: [
    {
      currencyType: { type: String, require: true },
      currencyRate: { type: String, require: true },
    },
  ],
});

const History = mongoose.model("history", historySchema);

module.exports = History;
