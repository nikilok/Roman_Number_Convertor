import hashTable from "./data.json";

class RomanNumerals {
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

  fromRoman(roman: string): number {
    return 1;
  }
}

export default RomanNumerals;
