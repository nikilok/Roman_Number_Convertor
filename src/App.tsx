import React, { useState, useEffect } from "react";
import RomanNumerals from "./utils/RomanNumeral";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [isOutBound, setIsOutBound] = useState(false);

  const changeHandler = (event: any) => {
    const value = event.target.value;
    setValue(value);
  };

  const romanNumber = new RomanNumerals();

  useEffect(() => {
    //@ts-ignore
    if (isNaN(value)) {
      // console.log("Not a number");
      // This can be treated as a Roman Numeral
    } else {
      // console.log("Is a number");
      // This can be treated as a Numeric number
      if (value.length > 0) {
        const roman = romanNumber.toRoman(parseInt(value));
        if (roman) {
          setIsOutBound(false);
          setOutput(roman);
        } else {
          console.log("You got null");
          setIsOutBound(true);
        }
      } else {
        setOutput("");
      }
    }
  }, [value]);

  return (
    <>
      <h1>Type in a number or roman numeral below</h1>
      <div className="container">
        <input
          type="text"
          value={value}
          placeholder="Enter numeral or roman numbers"
          onChange={changeHandler}
          autoFocus
        />

        {output && !isOutBound && <div className="output">{output}</div>}

        {isOutBound && (
          <div className="outbound">Enter a number between 1 and 3,999,999</div>
        )}
      </div>
    </>
  );
}

export default App;
