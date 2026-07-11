export type BetOutcome = {
  ID: string;
  O: string;
  N: string;
  MBS: string;
  G: string;
  OD: number;
  IMF: boolean;
};

export type BetMarket = {
  ID: string;
  N: string;
  MBS: string;
  SO: number;
  OC: Record<string, BetOutcome>;
};

export type BetEvent = {
  C: string;
  N: string;
  TYPE: string;
  NID: string;
  D: string;
  T: string;
  DAY: string;
  S: string;
  LN: string;
  IMF: boolean;
  OCG: Record<string, BetMarket>;
  HEC: boolean;
};
