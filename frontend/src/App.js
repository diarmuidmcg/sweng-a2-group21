import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

import axios from "axios";

const btnValues = [
  ["^", "exp", "C"],
  ["(", ")", "log", "/"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (number) =>
  String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (number) => number.toString().replace(/\s/g, "");

const App = () => {
  let [input, setInput] = useState({
    operator: "",
    number: "",
    expression: "",
    result: "",
    calculate: false,
    decimal: false,
  });

  const clearClickHandler = () => {
    setInput({
      ...input,
      operator: "",
      number: "",
      expression: "",
      decimal: false,
    });
  };

  const equalsClickHandler = async () => {
    var data = { expression: input.expression };
    // const url = process.env.REACT_APP_SERVER_ADDRESS;
    // console.log("url is " + url);
    let url = "http://127.0.0.1:8000";
    axios.post(url, data).then((response) => {
      console.log("reponse is " + response.data);
      // input.expression = response.data;
      setInput({
        ...response.data,
        expression: response.data,
        operator: "",
        number: "",
        result: response.data,
        decimal: false,
      });
    });
  };

  /*const operatorClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

      setInput({
        ...input,
        expression: 
          value === "x^y"
          ? input.expression + "^"
          : value === "e^y"
          ? input.expression + "e^"
          : input.expression + value
        decimal: false,
      });
    }*/

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (!input.decimal) {
      setInput({
        ...input,
        expression:
          input.expression + !input.number.toString().includes(".")
            ? input.expression + value
            : input.expression,
        decimal: true,
      });
    }
  };

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(input.expression).length < 20) {
      setInput({
        ...input,
        expression:
          input.expression === 0 && value === "0"
            ? "0"
            : value === "x^y"
            ? input.expression + "^"
            : value === "e^x"
            ? input.expression + "e^"
            : removeSpaces(input.expression + value),
        decimal: false,
      });
    }
  };

  return (
    <Wrapper>
      <Screen value={input.expression} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={
                btn === "=" || btn === "C"
                  ? "equals"
                  : btn === "/" ||
                    btn === "*" ||
                    btn === "-" ||
                    btn === "+" ||
                    btn === "^" ||
                    btn === "exp"
                  ? "signs"
                  : ""
              }
              value={btn}
              onClick={
                btn === "C"
                  ? clearClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : /*: btn ==="/" || btn === "x" || btn === "-" || btn === "+" || btn === "("
                  || btn === ")" || btn === "x^y" || btn === "ln" || btn === "e^y"
                  ? operatorClickHandler*/
                    numberClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};
export default App;
