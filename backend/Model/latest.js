const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const latestSchema = new Schema({
  rates: [
    {
      currencyType: { type: String, require: true },
      currencyRate: { type: String, require: true },
    },
  ],
});

const Latest = mongoose.model("latest", latestSchema);

module.exports = Latest;
