import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectSelectionByEventId } from '../../bet-slip/betSlip.selectors';
import { toggleSelection } from '../../bet-slip/betSlip.slice';
import { MARKET_COLUMNS } from '../bulletin.constants';
import type { BetEvent } from '../bulletin.types';
import { getOutcome, parseMbs, parseOdd } from '../bulletin.utils';
import styles from './bulletin.module.scss';
import OddCell from './OddCell';

type BulletinRowProps = {
  event: BetEvent;
};

const BulletinRow = ({ event }: BulletinRowProps) => {
  const dispatch = useAppDispatch();
  const activeSelection = useAppSelector((state) =>
    selectSelectionByEventId(state, event.NID)
  );
  const mbs = event.OCG['1']?.MBS;
  const availableMarketCount = Object.keys(event.OCG).length;

  const handleOddSelection = (marketId: string, outcomeId: string) => {
    const market = event.OCG[marketId];
    const outcome = market?.OC[outcomeId];
    const odd = outcome ? parseOdd(outcome.O) : undefined;
    const selectionMbs = market ? parseMbs(market.MBS) : undefined;

    if (
      !market ||
      !outcome ||
      odd === undefined ||
      selectionMbs === undefined
    ) {
      return;
    }

    dispatch(
      toggleSelection({
        eventId: event.NID,
        eventCode: event.C,
        eventName: event.N,
        marketId,
        marketName: market.N,
        outcomeId,
        outcomeName: outcome.N,
        odd,
        mbs: selectionMbs,
        selectionKey: `${event.NID}:${marketId}:${outcomeId}`,
      })
    );
  };

  return (
    <div className={styles.bulletinRow} role="rowgroup">
      <div className={styles.eventMeta}>
        <span>{event.D}</span>
        <span>{event.DAY}</span>
        <strong>{event.LN}</strong>
      </div>
      <div className={`${styles.grid} ${styles.eventLine}`} role="row">
        <div className={styles.eventName} role="cell">
          <strong>{event.C}</strong>
          <span>{event.T}</span>
          <span>{event.N}</span>
        </div>
        <div className={styles.commentsCell} role="cell">
          Yorumlar
        </div>
        <div role="cell">{mbs}</div>
        {MARKET_COLUMNS.map((column) => (
          <OddCell
            key={column.key}
            column={column}
            eventName={event.N}
            outcome={getOutcome(event, column.marketId, column.outcomeId)}
            selected={
              activeSelection?.selectionKey ===
              `${event.NID}:${column.marketId}:${column.outcomeId}`
            }
            onSelect={handleOddSelection}
          />
        ))}
        <div role="cell">{availableMarketCount}</div>
      </div>
    </div>
  );
};

export default memo(BulletinRow);
