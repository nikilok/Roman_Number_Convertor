import RomanNumerals from "./RomanNumeral";
import { lookupByRoman, originalLookup } from "./types";

describe("Numeral to Roman", () => {
  const rn = new RomanNumerals(true);
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

describe("Roman to Numeral", () => {
  const rn = new RomanNumerals();
  type TestCase = [string, number];
  const TEST_CASES: TestCase[] = [
    ["MMMX", 3010],
    ["CCCLII", 352],
    ["(IV)DLII", 4552],
    ["MMMCMXCIX", 3999],
    ["C", 100],
    ["XLII", 42],
    ["VI", 6],
    ["(V)", 5000],
    ["(VMM)", 7000],
    ["(X)", 10000],
    ["(X)M", 11000],
    ["(X)MMCCCX", 12310],
    ["(MM)(CCC)", 2300000],
    ["(CC)(XC)DCCCXC", 290890],
    ["(MMM)(CD)(XXX)MMDCCXII", 3432712],
    ["(mmm)(cd)(xxx)mmdccxii", 3432712],
    // Invalid Romans
    ["ABC", 0],
    ["MMMABC", 0],
    ["IIII", 0],
    ["VVV", 0],
  ];

  test.each<TestCase>(TEST_CASES)(
    "given %j as input, it should transform it to %j",
    (input, output) => {
      expect(rn.fromRoman(input)).toEqual(output);
    }
  );
});

describe("Convert Original Lookup to Lookup by Roman", () => {
  const rn = new RomanNumerals(true);
  type TestCase = [originalLookup, lookupByRoman];

  const original1 = {
    "7": {
      "1": "(M)",
      "2": "(MM)",
      "3": "(MMM)",
    },
    "6": {
      "1": "(C)",
      "2": "(CC)",
      "3": "(CCC)",
      "4": "(CD)",
      "5": "(D)",
      "6": "(DC)",
      "7": "(DCC)",
      "8": "(DCCC)",
      "9": "(CM)",
    },
  };

  const lookupByRoman1 = {
    "(M)": {
      totalLength: 7,
      numericValue: 1,
    },
    "(MM)": {
      totalLength: 7,
      numericValue: 2,
    },
    "(MMM)": {
      totalLength: 7,
      numericValue: 3,
    },
    "(C)": {
      totalLength: 6,
      numericValue: 1,
    },
    "(CC)": {
      totalLength: 6,
      numericValue: 2,
    },
    "(CCC)": {
      totalLength: 6,
      numericValue: 3,
    },
    "(CD)": {
      totalLength: 6,
      numericValue: 4,
    },
    "(D)": {
      totalLength: 6,
      numericValue: 5,
    },
    "(DC)": {
      totalLength: 6,
      numericValue: 6,
    },
    "(DCC)": {
      totalLength: 6,
      numericValue: 7,
    },
    "(DCCC)": {
      totalLength: 6,
      numericValue: 8,
    },
    "(CM)": {
      totalLength: 6,
      numericValue: 9,
    },
  };
  const TEST_CASES: TestCase[] = [[original1, lookupByRoman1]];

  test.each<TestCase>(TEST_CASES)(
    "given %j as input, it should transform it to %j",
    (input, output) => {
      expect(rn.buildLookUpByRoman(input)).toMatchObject(output);
    }
  );
});
