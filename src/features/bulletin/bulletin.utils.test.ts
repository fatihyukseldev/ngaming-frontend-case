import type { BetEvent } from './bulletin.types';
import { getOutcome } from './bulletin.utils';

const event: BetEvent = {
  C: '2002',
  N: 'Real Madrid - Galatasaray',
  TYPE: '1',
  NID: '2146483649',
  D: '17.08.2023',
  T: '10:35',
  DAY: 'Salı',
  S: 'Open',
  LN: 'Türkiye Süper Ligi',
  IMF: false,
  HEC: false,
  OCG: {
    '1': {
      ID: '1',
      N: 'Maç Sonucu',
      MBS: '4',
      SO: 1,
      OC: {
        '0': {
          ID: '0',
          O: '6.71',
          N: '1',
          MBS: '4',
          G: '1',
          OD: 0,
          IMF: false,
        },
      },
    },
  },
};

describe('getOutcome', () => {
  it('returns the outcome at the requested market coordinates', () => {
    expect(getOutcome(event, '1', '0')?.O).toBe('6.71');
  });

  it('returns undefined when the outcome is unavailable', () => {
    expect(getOutcome(event, '1', '2')).toBeUndefined();
  });
});
