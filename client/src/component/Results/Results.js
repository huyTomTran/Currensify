import React from "react";

import styled from "styled-components";
import getSymbolFromCurrency from "currency-symbol-map";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { findEquivalentDollar } from "../../WebServiceAPI/WebServiceAPI";

const Results = (props) => {
  return (
    <Wrapper>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom>
            <Res>
              {props.total}
              {getSymbolFromCurrency(props.toCurrency)}
            </Res>{" "}
            in {props.toCurrency}
          </Typography>
          <Typography variant="h5" component="h2">
            1 {props.fromCurrency} ={" "}
            {findEquivalentDollar(props.fromCurrencyVal, props.toCurrencyVal)}{" "}
            {props.toCurrency}
          </Typography>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export { Results };

const Wrapper = styled.div`
  margin: 2%;
  height: 10vh;
display
  border: 1px solid gray;
`;

const Total = styled.div``;

const Res = styled.span`
  color: green;
`;

const EquivalentContainer = styled.div``;
