import React, { PureComponent } from "react";
import Axios from "axios";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import { withRouter } from "react-router-dom";

class Logout extends PureComponent {
  componentWillUnmount = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  logout = () => {
    let payload = {
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    };
    Axios.put(
      "https://soen487a2backend.herokuapp.com/authenticate/logout",
      payload
    )
      .then((res) => {
        this.props.history.push("/");
      })
      .catch(() => {});
  };
  render() {
    return (
      <Wrapper>
        <Title>Currenshipfy</Title>

        <Button
          style={{ margin: "2% 2%", background: "red", color: "white" }}
          onClick={this.logout}
        >
          Logout
        </Button>
      </Wrapper>
    );
  }
}

export default withRouter(Logout);

const Title = styled.h2`
  font-size: 2em;
  color: white;
  margin: 2% 2%;
`;

const Wrapper = styled.div`
  width: 100%;
  background: black;
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
