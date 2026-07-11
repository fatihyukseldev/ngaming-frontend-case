import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCombinedOdd, selectSelections } from '../betSlip.selectors';
import { clearBetSlip } from '../betSlip.slice';
import BetSlipItem from './BetSlipItem';
import styles from './betSlip.module.scss';

const BetSlip = () => {
  const dispatch = useAppDispatch();
  const selections = useAppSelector(selectSelections);
  const combinedOdd = useAppSelector(selectCombinedOdd);
  const [isOpen, setIsOpen] = useState(false);

  const handleBetSlipClear = () => {
    dispatch(clearBetSlip());
  };

  const handleBetSlipToggle = () => {
    setIsOpen((open) => !open);
  };

  const handleBetSlipClose = () => {
    setIsOpen(false);
  };

  return (
    <aside
      className={`${styles.betSlip} ${isOpen ? styles.open : ''}`}
      aria-labelledby="bet-slip-title"
    >
      <div className={styles.content} id="bet-slip-content">
        <header className={styles.header}>
          <h2 id="bet-slip-title">Bahis Kuponu</h2>
          <div className={styles.headerActions}>
            {selections.length > 0 && (
              <button type="button" onClick={handleBetSlipClear}>
                Temizle
              </button>
            )}
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Bahis kuponunu kapat"
              onClick={handleBetSlipClose}
            >
              ×
            </button>
          </div>
        </header>

        {selections.length === 0 ? (
          <p className={styles.emptyState}>
            Kuponunuza eklemek için bir oran seçin.
          </p>
        ) : (
          <>
            <ul className={styles.list}>
              {selections.map((selection) => (
                <BetSlipItem
                  key={selection.selectionKey}
                  selection={selection}
                />
              ))}
            </ul>
            <div className={styles.total}>
              <span>Toplam Oran</span>
              <strong>{combinedOdd.toFixed(2)}</strong>
            </div>
          </>
        )}
      </div>

      <button
        type="button"
        className={styles.mobileSummary}
        aria-expanded={isOpen}
        aria-controls="bet-slip-content"
        onClick={handleBetSlipToggle}
      >
        <span>Kupon ({selections.length})</span>
        <strong>
          {selections.length > 0
            ? `Toplam ${combinedOdd.toFixed(2)}`
            : 'Oran seçin'}
        </strong>
      </button>
    </aside>
  );
};

export default BetSlip;
