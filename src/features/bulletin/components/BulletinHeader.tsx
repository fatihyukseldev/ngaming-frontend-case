import { MARKET_COLUMNS } from '../bulletin.constants';
import styles from './bulletin.module.scss';

const BulletinHeader = () => (
  <div
    className={`${styles.grid} ${styles.header}`}
    role="row"
    aria-rowindex={1}
  >
    <div className={styles.eventHeader} role="columnheader">
      Etkinlik
    </div>
    <div role="columnheader">Yorumlar</div>
    <div role="columnheader">MBS</div>
    {MARKET_COLUMNS.map((column) => (
      <div key={column.key} role="columnheader">
        {column.label}
      </div>
    ))}
    <div role="columnheader">+99</div>
  </div>
);

export default BulletinHeader;
