# SOEN487_A3

## Demo website
Here is a link for the demo website https://currenshipfy.herokuapp.com/

## How to run the backend
### Demo website for the backend
https://soen487a2backend.herokuapp.com/

#### To use the API
*API to get a specific latest currency. <br />
Syntax: https://soen487a2backend.herokuapp.com/api/currency_latest?type=[Currency Type] <br />
Example: https://soen487a2backend.herokuapp.com/api/currency_latest?type=USD

*API to get the all latest currency. <br />
Method: [GET] <br />
Syntax: https://soen487a2backend.herokuapp.com/api/get_all_currency_latest?currency=[Currency type]<br />
Example: https://soen487a2backend.herokuapp.com/api/get_all_currency_latest?currency=USD

*API to get the history of a currency by specific date. <br />
Method: [GET] <br />
Syntax: https://soen487a2backend.herokuapp.com/api/currency_history_date?date=[YYYY-MM-DD]<br />
Example: https://soen487a2backend.herokuapp.com/api/currency_history_date?date=2020-04-01

*API to Add the history of a currency by specific date. <br />
Method: [POST] <br />
Syntax: https://soen487a2backend.herokuapp.com/api/add_currency_history_date?date=[YYYY-MM-DD]<br />
Example: https://soen487a2backend.herokuapp.com/api/add_currency_history_date?date=2020-04-01

#### To download the backend and run on local machine
1. To run the backend, simply go to the backend folder and download all files.
2. After downloading files, you will need to go to make a .env file to store your credentials
  2.1. note: you .env file should looke like this, 
  { uri: <username:password (MongodDB credentials)>,
    apiLink: https://exchangeratesapi.io/
  }
  
  Reference for api : https://exchangeratesapi.io/
