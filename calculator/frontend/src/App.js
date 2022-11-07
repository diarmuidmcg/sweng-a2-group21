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

const App = () => {
  let [calc, setCalc] = useState({
    operator: "",
    num: 0,
    res: 0,
  });

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : btn === "C" ||
               btn === "/" || btn === "x" || btn === "-" || btn === "+" ? "signs" : ""}
              value={btn}
              /*onClick={
              }*/
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;