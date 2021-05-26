import React, { PureComponent } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

import { getHistoricData } from "../../WebServiceAPI/WebServiceAPI";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Loader from "react-loader-spinner";

class HistoricTable extends PureComponent {
  state = {
    rows: [],
    selectedDate: null,
    displayDate: "",
    isLoad: false,
  };

  componentDidMount = () => {
    //getHistoricData();
  };

  handleDateChange = (date) => {
    // let getDate = format(date, "yyyy/MM/dd");
    this.setState({ selectedDate: date });
  };

  findDate = () => {
    this.setState({ rows: [] });
    let result = format(this.state.selectedDate, "yyyy-MM-dd");
    if (this.state.selectedDate != null) {
      getHistoricData(result).then((results) => {
        if (results != undefined) {
          if (results == "Error") {
            return alert("Error, try again");
          }

          this.setState({
            rows: this.state.rows.concat(results.rates),
            isLoad: true,
            displayDate: result,
          });
        } else {
          alert("Sorry there was no results found, please try again");
        }
      });
    }
  };

  render() {
    return (
      <div>
        <InputContainer>
          <span>Please choose a date</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              disableFuture={true}
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
            />
          </MuiPickersUtilsProvider>
          <Button
            disabled={!this.state.selectedDate}
            variant="contained"
            onClick={this.findDate}
          >
            Submit
          </Button>
        </InputContainer>
        <Container>
          {this.state.isLoad ? (
            this.state.rows ? (
              <TableWrapper component={Paper}>
                <p>Date searched: {this.state.displayDate}</p>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableR>
                      <TableCell align="right">Currency Name</TableCell>
                      <TableCell align="right">Before</TableCell>
                      <TableCell align="right">Today</TableCell>
                      <TableCell align="right">Changes</TableCell>
                    </TableR>
                  </TableHead>
                  <TableBody>
                    {this.state.rows.map((row) => (
                      <TableRow>
                        <TableCell
                          style={{ fontWeight: "bold" }}
                          component="th"
                          scope="row"
                        >
                          {row.currencyType}
                        </TableCell>
                        <TableCell align="right">{row.currencyRate}</TableCell>
                        <TableCell align="right">{row.now}</TableCell>
                        <TableCell
                          style={
                            row.change >= 0
                              ? { color: "green" }
                              : { color: "red" }
                          }
                          align="right"
                        >
                          {row.change}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrapper>
            ) : (
              <Loader type="Rings" color="black" height={100} width={100} />
            )
          ) : null}
        </Container>
      </div>
    );
  }
}

export { HistoricTable };

const TableWrapper = styled(TableContainer)`
  max-height: 60vh;
  margin: 10% 0%;
`;

const TableR = styled(TableRow)`
  .MuiTableCell-stickyHeader {
    background: black;
    color: white;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Container = styled.div``;
