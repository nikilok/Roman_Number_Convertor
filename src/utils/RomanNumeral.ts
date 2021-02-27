import hashTable from "./data.json";
import { lookupByRoman, originalLookup } from "./types";

class RomanNumerals {
  constructor(doNotBuildLookupByRoman?: boolean) {
    if (!doNotBuildLookupByRoman) {
      this.lookupByRoman = this.buildLookUpByRoman(hashTable);
    }
  }
  // HashTable that holds the lookup by Roman numerals
  lookupByRoman = {};
  /**
   * Fn that converts a numeral to roman number
   * @param numeral number
   */
  toRoman(numeral: number): string | null {
    let currentPosition = numeral.toString().length;
    let romanString = "";

    if (numeral < 1) return null;

    for (const char of numeral.toString()) {
      if (char !== "0") {
        try {
          //@ts-ignore
          const lookupData = hashTable[currentPosition][char];
          if (lookupData) {
            romanString += lookupData;
          } else {
            return null;
          }
        } catch (e) {
          // Handle out of bounds
          return null;
        }
      }
      currentPosition--;
    }
    return romanString;
  }

  /**
   * Fn that converts a roman string, to the numeric number
   * @param roman string
   */
  fromRoman(roman: string): number {
    let lastLongestMatch = 0;
    let lastPower = Infinity;
    let lastValidPower = Infinity;
    let lastNumericValue = 0;
    let currentNumber = 1;
    let result = 0;
    let base = 1;

    while (currentNumber <= roman.length) {
      const currentSubString = roman.substring(0, currentNumber);
      if (currentSubString.length > 0) {
        //@ts-ignore
        const lookupData = this.lookupByRoman[currentSubString];

        if (lookupData) {
          if (currentSubString.length > lastLongestMatch) {
            lastLongestMatch = currentSubString.length;
            lastPower = lookupData.totalLength;
            lastNumericValue = lookupData.numericValue;
            base = lastPower > 1 ? 10 : 1;
          }
        } else if (lastLongestMatch > 0) {
          if (lastValidPower === Infinity) {
            lastValidPower = lastPower + 1;
          }
          if (lastPower < lastValidPower) {
            result += lastNumericValue * Math.pow(base, lastPower - 1);
            roman = roman.slice(currentNumber - 1);
            currentNumber = 0;
            lastLongestMatch = 0;
            lastValidPower = lastPower;
          } else {
            return 0;
          }
        }
      }

      currentNumber++;
    }

    // Handle the last matched longest roman string
    if (lastLongestMatch > 0 && lastPower < lastValidPower) {
      result += lastNumericValue * Math.pow(base, lastPower - 1);
    } else {
      return 0;
    }
    return result;
  }

  /**
   * Fn that builds a hashTable of shape (lookupByRoman)
   * @param originalLookup the original lookup hashTable
   */
  buildLookUpByRoman(originalLookup: originalLookup): lookupByRoman {
    let lookupByRoman = {};

    for (const [totalLength, orignalValue] of Object.entries(originalLookup)) {
      for (const [numericValue, romanString] of Object.entries(orignalValue)) {
        //@ts-ignore
        lookupByRoman[romanString] = {
          totalLength: parseInt(totalLength),
          numericValue: parseInt(numericValue),
        };
      }
    }
    return lookupByRoman;
  }
}

export default RomanNumerals;
