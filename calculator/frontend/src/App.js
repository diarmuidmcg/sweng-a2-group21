import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["(", ")", "x^y", "C"],
  ["log", "ln", "e^x", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (number) =>
  String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

  const removeSpaces = (number) => number.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    operator: "",
    number: 0,
    result: 0,
    calculate: false,
  });

  const clearClickHandler = () => {
    setCalc({
      ...calc,
      operator: "",
      number: 0,
      result: 0,
    });
  };

  const equalsClickHandler = () => {
    setCalc({
      ...calc,
      calculate: true,
    });
  }

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  }

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      number: !calc.number.toString().includes(".") ? calc.number + value : calc.number,
    });
  };

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.number).length < 16) {
      setCalc({
        ...calc,
        number:
          calc.number === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.number) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.number + value)))
            : toLocaleString(calc.number + value),
        result: !calc.operator ? 0 : calc.result,
      });
    }
  };

  return (
    <Wrapper>
      <Screen value={calc.number ? calc.number : calc.result} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : btn === "C" ||
               btn === "/" || btn === "x" || btn === "-" || btn === "+" ? "signs" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? clearClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
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