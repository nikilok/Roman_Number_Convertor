import RomanNumerals from "./RomanNumeral";

describe("Numeral to Roman", () => {
  const rn = new RomanNumerals();
  type TestCase = [number, string | null];
  const TEST_CASES: TestCase[] = [
    [3010, "MMMX"],
    [352, "CCCLII"],
    [4552, "(IV)DLII"],
    [3999, "MMMCMXCIX"],
    [100, "C"],
    [42, "XLII"],
    [6, "VI"],
    // zero doesn't exist in the Roman number system.
    [0, null],
    // negative numbers doesn't exist in the Roman number system.
    [-10, null],
    [5000, "(V)"],
    [7000, "(VMM)"],
    [10000, "(X)"],
    [11000, "(X)M"],
    [12310, "(X)MMCCCX"],
    [2300000, "(MM)(CCC)"],
    [290890, "(CC)(XC)DCCCXC"],
    [3432712, "(MMM)(CD)(XXX)MMDCCXII"],
    // > 4 Million doesn't exist in the Roman Number system.
    [4000000, null],
  ];

  test.each<TestCase>(TEST_CASES)(
    "given %j as input, it should transform it to %j",
    (input, output) => {
      expect(rn.toRoman(input)).toEqual(output);
    }
  );
});
