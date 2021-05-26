import Axios from "axios";

export const fetchCurrency = async (fromCurrency, toCurrency) => {
  let res = await Axios.get(
    "https://soen487a2backend.herokuapp.com/api/currency_latest?type=" +
      fromCurrency
  );
  let data = res.data;
  console.log(data);

  let res1 = await Axios.get(
    "https://soen487a2backend.herokuapp.com/api/currency_latest?type=" +
      toCurrency
  );
  let data1 = res1.data;
  console.log(data1);

  let obj = {};
  obj.fromCurrency = data[0].rates[0].currencyRate;
  obj.toCurrency = data1[0].rates[0].currencyRate;
  return obj;
};

export const calculateResults = (amount, fromCurrency, toCurrency) => {
  let results = (amount / fromCurrency) * toCurrency;
  return results.toFixed(2);
};

export const findEquivalentDollar = (fromCurrency, toCurrency) => {
  let results = (1 / fromCurrency) * toCurrency;
  console.log("to: " + toCurrency + "from: " + fromCurrency);
  console.log(results);
  return results.toFixed(2);
};

export const getHistoricData = async (date) => {
  let res = await Axios.get(
    "https://soen487a2backend.herokuapp.com/api/currency_history_date?date=" +
      date
  );
  let res2 = await Axios.get(
    "https://soen487a2backend.herokuapp.com/api/get_all_currency_latest"
  );

  console.log(res.data);
  if (res.data.length > 0) {
    let obj = res.data[0].rates;

    console.log(res2.data[0].rates[0].currencyRate);
    for (let i = 0; i < obj.length; i++) {
      obj[i].now = res2.data[0].rates[i].currencyRate;

      let changes = 0;
      changes = res2.data[0].rates[i].currencyRate - obj[i].currencyRate;
      obj[i].change = changes.toFixed(4);
    }

    console.log(obj);
    return res.data[0];
  } else {
    return "Error";
  }
};
