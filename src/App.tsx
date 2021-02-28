import React, { useState, useEffect } from "react";
import RomanNumerals from "./utils/RomanNumeral";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [isOutBound, setIsOutBound] = useState(false);
  const [isFaultyRoman, setIsFaultyRoman] = useState(false);
  const [romanNumber, setRomanNumber] = useState<RomanNumerals>();

  const changeHandler = (event: any) => {
    const value = event.target.value;
    setValue(value);
  };

  const toggleError = (mode: "Roman" | "Numeral", isDisplayed: boolean) => {
    if (mode === "Roman") {
      setIsFaultyRoman(isDisplayed);
      setIsOutBound(false);
    } else {
      setIsOutBound(isDisplayed);
      setIsFaultyRoman(false);
    }
  };

  useEffect(() => {
    // Initialize an instance of RomanNumerals
    // when the page loads once
    setRomanNumber(new RomanNumerals());
  }, []);

  useEffect(() => {
    if (romanNumber && value.length > 0) {
      //@ts-ignore
      if (isNaN(value)) {
        // This can be treated as a Roman Numeral
        const numeral = romanNumber.fromRoman(value);
        if (numeral > 0) {
          toggleError("Roman", false);
          setOutput(numeral.toString());
        } else {
          toggleError("Roman", true);
        }
      } else {
        // This can be treated as a Numeric number
        const roman = romanNumber.toRoman(parseInt(value));
        if (roman) {
          toggleError("Numeral", false);
          setOutput(roman);
        } else {
          toggleError("Numeral", true);
        }
      }
    } else {
      setOutput("");
      toggleError("Roman", false);
    }
  }, [value, romanNumber]);

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

        {output && !isOutBound && !isFaultyRoman && (
          <div className="output">{output}</div>
        )}

        {isOutBound && (
          <div className="outbound">Enter a number between 1 and 3,999,999</div>
        )}

        {isFaultyRoman && (
          <div className="outbound">You entered an invalid roman number</div>
        )}
      </div>
    </>
  );
}

export default App;
