import React, { PureComponent } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class Authentication extends PureComponent {
  state = {
    switch: true,
    LogEmail: "",
    LogPassword: "",
    LogError: false,
    RegEmail: "",
    RegPassword: "",
    RegSuccess: false,
    RegError: false,
  };

  Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  login = () => {
    let payload = {
      email: this.state.LogEmail,
      password: this.state.LogPassword,
    };

    Axios.put(
      "https://soen487a2backend.herokuapp.com/authenticate/login",
      payload
    )
      .then((res) => {
        console.log(res);
        if (res.data == "Success") {
          localStorage.setItem("email", this.state.LogEmail);
          localStorage.setItem("password", this.state.LogPassword);

          this.props.history.push("/homepage");
        }
        this.setState({ logError: true });
      })
      .catch(() => {
        this.setState({ logError: true });
      });
  };

  register = () => {
    let payload = {
      email: this.state.RegEmail,
      password: this.state.RegPassword,
    };

    Axios.post(
      "https://soen487a2backend.herokuapp.com/authenticate/register",
      payload
    )
      .then((res) => {
        console.log(res);
        if (res.data == "Success") {
          console.log("good");
          this.setState({ RegSuccess: true });
        } else if (res.data.include("Error")) {
          this.setState({ RegError: true });
        }
      })
      .catch(() => {
        this.setState({ RegError: true });
      });
  };

  render() {
    return (
      <Wrapper>
        {this.state.switch ? (
          <LoginContainer>
            <h2>Login</h2>
            <TextField
              onChange={(e) => {
                this.setState({ LogEmail: e.target.value });
              }}
              required
              label="Email"
            />
            <TextField
              onChange={(e) => {
                this.setState({ LogPassword: e.target.value });
              }}
              required
              type="password"
              label="Password"
            />
            <Button onClick={this.login}>Submit</Button>
            <Button
              onClick={() => {
                this.setState({ switch: !this.state.switch });
              }}
            >
              Need an account? Register here
            </Button>
          </LoginContainer>
        ) : (
          <RegisterContainer>
            <h2>Register</h2>
            <TextField
              onChange={(e) => {
                this.setState({ RegEmail: e.target.value });
              }}
              required
              label="Email"
            />
            <TextField
              onChange={(e) => {
                this.setState({ RegPassword: e.target.value });
              }}
              required
              type="password"
              label="Password"
            />
            <Button onClick={this.register}>Submit</Button>
            <Button
              onClick={() => {
                this.setState({ switch: !this.state.switch });
              }}
            >
              Already have an account? login here
            </Button>
          </RegisterContainer>
        )}

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.logError}
          autoHideDuration={1000}
          onClose={() => {
            this.setState({ logError: !this.state.logError });
          }}
        >
          <MuiAlert severity="error" elevation={6} variant="filled">
            Error, could not login user please try again.
          </MuiAlert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.RegError}
          autoHideDuration={3000}
          onClose={() => {
            this.setState({ RegError: !this.state.RegError });
          }}
        >
          <MuiAlert severity="error" elevation={6} variant="filled">
            Error, could not register user please try again.
          </MuiAlert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.RegSuccess}
          autoHideDuration={3000}
          onClose={() => {
            this.setState({ RegSuccess: !this.state.RegSuccess });
          }}
        >
          <MuiAlert severity="success" elevation={6} variant="filled">
            Successfully registered!
          </MuiAlert>
        </Snackbar>
      </Wrapper>
    );
  }
}

export default withRouter(Authentication);

const Wrapper = styled.div`
  margin: 4% 0;
  background: white;
  border-radius: 10px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2% 5%;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2% 5%;
`;
