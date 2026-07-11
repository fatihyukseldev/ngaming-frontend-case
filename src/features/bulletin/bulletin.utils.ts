import type { BetEvent, BetOutcome } from './bulletin.types';

export const getOutcome = (
  event: BetEvent,
  marketId: string,
  outcomeId: string
): BetOutcome | undefined => event.OCG[marketId]?.OC[outcomeId];

const parsePositiveNumber = (value: string): number | undefined => {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) && parsedValue > 0
    ? parsedValue
    : undefined;
};

export const parseOdd = (odd: string): number | undefined =>
  parsePositiveNumber(odd);

export const parseMbs = (mbs: string): number | undefined =>
  parsePositiveNumber(mbs);
