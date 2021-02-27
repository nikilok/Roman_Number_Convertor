export interface originalLookup {
  [totalLength: string]: {
    [numericValue: string]: string;
  };
}

export interface lookupByRoman {
  [key: string]: {
    totalLength: number;
    numericValue: number;
  };
}
