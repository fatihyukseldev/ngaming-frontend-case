import type { BetOutcome } from '../bulletin.types';
import styles from './bulletin.module.scss';

type OddCellProps = {
  outcome: BetOutcome | undefined;
};

const OddCell = ({ outcome }: OddCellProps) => (
  <div className={styles.oddCell} role="cell">
    {outcome?.O}
  </div>
);

export default OddCell;
