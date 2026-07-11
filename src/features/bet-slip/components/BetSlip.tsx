import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCombinedOdd, selectSelections } from '../betSlip.selectors';
import { clearBetSlip } from '../betSlip.slice';
import BetSlipItem from './BetSlipItem';
import styles from './betSlip.module.scss';

const BetSlip = () => {
  const dispatch = useAppDispatch();
  const selections = useAppSelector(selectSelections);
  const combinedOdd = useAppSelector(selectCombinedOdd);

  const handleBetSlipClear = () => {
    dispatch(clearBetSlip());
  };

  return (
    <aside className={styles.betSlip} aria-labelledby="bet-slip-title">
      <header className={styles.header}>
        <h2 id="bet-slip-title">Bahis Kuponu</h2>
        {selections.length > 0 && (
          <button type="button" onClick={handleBetSlipClear}>
            Temizle
          </button>
        )}
      </header>

      {selections.length === 0 ? (
        <p className={styles.emptyState}>
          Kuponunuza eklemek için bir oran seçin.
        </p>
      ) : (
        <>
          <ul className={styles.list}>
            {selections.map((selection) => (
              <BetSlipItem key={selection.selectionKey} selection={selection} />
            ))}
          </ul>
          <div className={styles.total}>
            <span>Toplam Oran</span>
            <strong>{combinedOdd.toFixed(2)}</strong>
          </div>
        </>
      )}
    </aside>
  );
};

export default BetSlip;
