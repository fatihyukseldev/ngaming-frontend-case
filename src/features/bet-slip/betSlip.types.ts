export type BetSelection = {
  eventId: string;
  eventCode: string;
  eventName: string;
  marketId: string;
  marketName: string;
  outcomeId: string;
  outcomeName: string;
  odd: number;
  mbs: number;
  selectionKey: string;
};

export type BetSlipState = {
  selectionsByEventId: Record<string, BetSelection>;
};
