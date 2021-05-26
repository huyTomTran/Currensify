var schedule = require("node-schedule");
var needle = require("needle");
const express = require("express");
const route = express.Router();

const cors = require("cors");

const History = require("../Model/history.js");

route.use(cors());

// run everyday at midnight 0 0 * * *
schedule.scheduleJob("0 0 * * *", () => {
  console.log("test");
  needle.post(
    "https://soen487a2backend.herokuapp.com/api/add_currency_history",
    (error, response) => {
      if (!error && response.statusCode == 200) {
      } else {
        console.log(error);
      }
    }
  );
});

route.post("/add_currency_history_at", (req, res) => {
  let date = req.query.date;

  const rp = require("request-promise");
  rp("https://api.exchangeratesapi.io/" + date).then((body) => {
    console.log(body);
    let jObj = JSON.parse(body);

    let getSize = Object.keys(jObj.rates).length;

    let rates = [];

    for (let i = 0; i < getSize; i++) {
      let rate = {};
      rate.currencyType = Object.keys(jObj.rates)[i];
      rate.currencyRate = Object.values(jObj.rates)[i];
      rates.push(rate);
    }

    const date = jObj.date;
    const newHistory = new History({
      date,
      rates,
    });

    newHistory
      .save()
      .then((item) => {
        console.log("Good: " + item);
        res.json(item);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

route.post("/add_currency_history", (req, res) => {
  console.log("inside history");

  const rp = require("request-promise");
  rp(process.env.apiLink).then((body) => {
    console.log(body);
    let jObj = JSON.parse(body);

    let getSize = Object.keys(jObj.rates).length;

    let rates = [];

    for (let i = 0; i < getSize; i++) {
      let rate = {};
      rate.currencyType = Object.keys(jObj.rates)[i];
      rate.currencyRate = Object.values(jObj.rates)[i];
      rates.push(rate);
    }
    // console.log(rates);

    const date = jObj.date;
    // console.log("date: " + date);
    const newHistory = new History({
      date,
      rates,
    });
    // console.log("r: " + rates);
    // console.log("N: " + newHistory.date + " " + newHistory.rates);

    newHistory
      .save()
      .then((item) => {
        console.log("Good: " + item);
        res.json(item);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

route.get("/currency_history_date", (req, res) => {
  const date = req.query.date;
  console.log("test" + date);

  History.find({
    date: date,
  })
    .then((results) => {
      console.log("good: " + results);
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
});

route.get("/currency_history", (req, res) => {
  const currency = req.query.currency;
  console.log("test" + currency);

  History.find({
    rates: {
      $elemMatch: {
        currencyType: currency,
      },
    },
  })
    .then((results) => {
      console.log("good: " + results);
      res.json(results);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = route;
