import type { MarketColumn } from '../bulletin.constants';
import type { BetOutcome } from '../bulletin.types';
import { parseOdd } from '../bulletin.utils';
import styles from './bulletin.module.scss';

type OddCellProps = {
  column: MarketColumn;
  eventName: string;
  outcome: BetOutcome | undefined;
  selected: boolean;
  onSelect: (marketId: string, outcomeId: string) => void;
};

const OddCell = ({
  column,
  eventName,
  outcome,
  selected,
  onSelect,
}: OddCellProps) => {
  const odd = outcome ? parseOdd(outcome.O) : undefined;

  if (!outcome || odd === undefined) {
    return <div className={styles.oddCell} role="cell" />;
  }

  return (
    <div className={styles.oddCell} role="cell">
      <button
        type="button"
        className={styles.oddButton}
        aria-label={`${eventName}, ${outcome.N}, oran ${outcome.O}`}
        aria-pressed={selected}
        onClick={() => onSelect(column.marketId, column.outcomeId)}
      >
        {outcome.O}
      </button>
    </div>
  );
};

export default OddCell;
