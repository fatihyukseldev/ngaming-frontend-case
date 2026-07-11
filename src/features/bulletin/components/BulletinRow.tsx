import { MARKET_COLUMNS } from '../bulletin.constants';
import type { BetEvent } from '../bulletin.types';
import { getOutcome } from '../bulletin.utils';
import styles from './bulletin.module.scss';
import OddCell from './OddCell';

type BulletinRowProps = {
  event: BetEvent;
};

const BulletinRow = ({ event }: BulletinRowProps) => {
  const mbs = event.OCG['1']?.MBS;
  const availableMarketCount = Object.keys(event.OCG).length;

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
            outcome={getOutcome(event, column.marketId, column.outcomeId)}
          />
        ))}
        <div role="cell">{availableMarketCount}</div>
      </div>
    </div>
  );
};

export default BulletinRow;
