export type MarketColumn = {
  key: string;
  label: string;
  marketId: string;
  outcomeId: string;
};

// Keeping the API coordinates here makes column order a UI decision, not JSX knowledge.
export const MARKET_COLUMNS = [
  {
    key: 'match-result-home',
    label: '1',
    marketId: '1',
    outcomeId: '0',
  },
  {
    key: 'match-result-draw',
    label: 'X',
    marketId: '1',
    outcomeId: '1',
  },
  {
    key: 'match-result-away',
    label: '2',
    marketId: '1',
    outcomeId: '2',
  },
  {
    key: 'under-2-5',
    label: 'Alt',
    marketId: '5',
    outcomeId: '25',
  },
  {
    key: 'over-2-5',
    label: 'Üst',
    marketId: '5',
    outcomeId: '26',
  },
  {
    key: 'double-chance-1x',
    label: '1-X',
    marketId: '2',
    outcomeId: '3',
  },
  {
    key: 'double-chance-12',
    label: '1-2',
    marketId: '2',
    outcomeId: '4',
  },
  {
    key: 'double-chance-x2',
    label: 'X-2',
    marketId: '2',
    outcomeId: '5',
  },
] as const satisfies readonly MarketColumn[];
