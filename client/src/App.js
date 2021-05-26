import React from "react";

import styled from "styled-components";
import "./App.css";
import { Homepage } from "./Section/Homepage";
// import { Navigation } from "./component/Navigation/Navigation";
import { ConvertCurrency } from "./Section/ConvertCurrency";
import { HistoryCurrency } from "./Section/HistoryCurrency";
import Logout from "./component/Logout/Logout";
import { Footer } from "./Section/Footer";
import { ScrollTo } from "react-scroll-to";
import { Route, Link } from "react-router-dom";
import Axios from "axios";

function App() {
  window.onbeforeunload = function (e) {
    window.onunload = function () {
      let payload = {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      };
      Axios.put(
        "https://soen487a2backend.herokuapp.com/authenticate/logout",
        payload
      );
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    };
    return undefined;
  };

  window.onload = function () {
    return;
  };
  return (
    <Wrapper>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/homepage">
        <Logout />
        <ConvertCurrency />
        <HistoryCurrency />
      </Route>
      <Footer />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
`;
