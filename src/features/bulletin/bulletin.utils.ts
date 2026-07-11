import type { BetEvent, BetOutcome } from './bulletin.types';

export const getOutcome = (
  event: BetEvent,
  marketId: string,
  outcomeId: string
): BetOutcome | undefined => event.OCG[marketId]?.OC[outcomeId];
