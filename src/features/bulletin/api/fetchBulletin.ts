import type { BetEvent, BetMarket, BetOutcome } from '../bulletin.types';

const BULLETIN_URL = 'https://nesine-case-study.onrender.com/bets';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isBetOutcome = (value: unknown): value is BetOutcome => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.ID === 'string' &&
    typeof value.O === 'string' &&
    typeof value.N === 'string' &&
    typeof value.MBS === 'string' &&
    typeof value.G === 'string' &&
    typeof value.OD === 'number' &&
    typeof value.IMF === 'boolean'
  );
};

const isBetMarket = (value: unknown): value is BetMarket => {
  if (!isRecord(value) || !isRecord(value.OC)) {
    return false;
  }

  return (
    typeof value.ID === 'string' &&
    typeof value.N === 'string' &&
    typeof value.MBS === 'string' &&
    typeof value.SO === 'number' &&
    Object.values(value.OC).every(isBetOutcome)
  );
};

const isBetEvent = (value: unknown): value is BetEvent => {
  if (!isRecord(value) || !isRecord(value.OCG)) {
    return false;
  }

  return (
    typeof value.C === 'string' &&
    typeof value.N === 'string' &&
    typeof value.TYPE === 'string' &&
    typeof value.NID === 'string' &&
    typeof value.D === 'string' &&
    typeof value.T === 'string' &&
    typeof value.DAY === 'string' &&
    typeof value.S === 'string' &&
    typeof value.LN === 'string' &&
    typeof value.IMF === 'boolean' &&
    typeof value.HEC === 'boolean' &&
    Object.values(value.OCG).every(isBetMarket)
  );
};

export const fetchBulletin = async (
  signal: AbortSignal
): Promise<BetEvent[]> => {
  const response = await fetch(BULLETIN_URL, { signal });

  if (!response.ok) {
    throw new Error(`Bülten yüklenemedi (${response.status}).`);
  }

  const responseBody: unknown = await response.json();

  if (!Array.isArray(responseBody) || !responseBody.every(isBetEvent)) {
    throw new Error('Bülten servisi beklenmeyen bir yanıt döndürdü.');
  }

  return responseBody;
};
