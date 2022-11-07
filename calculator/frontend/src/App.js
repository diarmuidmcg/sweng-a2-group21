import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["x^y", "e^x", "C"],
  ["(", ")", "ln", "/"],
  [7, 8, 9, "x"],
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

  const equalsClickHandler = () => {
    setInput({
      ...input,
      expression: toLocaleString(input.expression),
      operator: "",
      number: "",
      decimal: false,
   });
  }

  const operatorClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

      setInput({
        ...input,
        expression: 
          input.expression + value,
        decimal: false,
      });
    }

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    if(!input.decimal) {
    setInput({
      ...input,
      expression: input.expression + !input.number.toString().includes(".") ? input.expression + value : input.expression,
      decimal: true,
    });
  }
  };

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(input.expression).length < 16) {
      setInput({
        ...input,
        expression:
          input.expression === 0 && value === "0"
            ? "0"
            : removeSpaces(input.expression) % 1 === 0
            ? toLocaleString(Number(removeSpaces(input.expression + value)))
            : toLocaleString(input.expression + value),
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
              className={btn === "=" || btn === "C" ? "equals" : 
               btn === "/" || btn === "x" || btn === "-" || btn === "+" ? "signs" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? clearClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : btn ==="/" || btn === "x" || btn === "-" || btn === "+" || btn === "("
                  || btn === ")" || btn === "x^y" || btn === "ln" || btn === "e^y"
                  ? operatorClickHandler
                  : numberClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};
export default App;