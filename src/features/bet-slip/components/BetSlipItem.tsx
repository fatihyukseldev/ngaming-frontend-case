import { useAppDispatch } from '../../../app/hooks';
import { removeSelection } from '../betSlip.slice';
import type { BetSelection } from '../betSlip.types';
import styles from './betSlip.module.scss';

type BetSlipItemProps = {
  selection: BetSelection;
};

const BetSlipItem = ({ selection }: BetSlipItemProps) => {
  const dispatch = useAppDispatch();

  const handleSelectionRemove = () => {
    dispatch(removeSelection(selection.eventId));
  };

  return (
    <li className={styles.item}>
      <div className={styles.itemHeader}>
        <strong>{selection.eventName}</strong>
        <button
          type="button"
          className={styles.removeButton}
          aria-label={`${selection.eventName} seçimini kaldır`}
          onClick={handleSelectionRemove}
        >
          ×
        </button>
      </div>
      <span>{selection.marketName}</span>
      <div className={styles.selectionDetails}>
        <span>{selection.outcomeName}</span>
        <strong>{selection.odd.toFixed(2)}</strong>
      </div>
      <small>MBS {selection.mbs}</small>
    </li>
  );
};

export default BetSlipItem;
