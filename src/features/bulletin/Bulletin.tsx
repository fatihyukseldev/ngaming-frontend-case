import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadBulletin } from './bulletin.slice';
import BulletinHeader from './components/BulletinHeader';
import BulletinRow from './components/BulletinRow';
import styles from './components/bulletin.module.scss';

const Bulletin = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.bulletin.events);
  const status = useAppSelector((state) => state.bulletin.status);
  const error = useAppSelector((state) => state.bulletin.error);

  useEffect(() => {
    const request = dispatch(loadBulletin());

    return () => request.abort();
  }, [dispatch]);

  if (status === 'idle' || status === 'loading') {
    return <p role="status">Bülten yükleniyor…</p>;
  }

  if (status === 'failed') {
    return (
      <section aria-labelledby="bulletin-error-title">
        <h2 id="bulletin-error-title">Bülten yüklenemedi</h2>
        <p>{error}</p>
        <button type="button" onClick={() => dispatch(loadBulletin())}>
          Tekrar dene
        </button>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section aria-labelledby="empty-bulletin-title">
        <h2 id="empty-bulletin-title">Bülten boş</h2>
        <p>Gösterilebilecek bir etkinlik bulunmuyor.</p>
      </section>
    );
  }

  return (
    <section className={styles.bulletin} aria-labelledby="bulletin-title">
      <h2 className={styles.title} id="bulletin-title">
        Bahis Bülteni
      </h2>
      <div className={styles.scrollArea} tabIndex={0}>
        <div className={styles.table} role="table">
          <BulletinHeader />
          {events.map((event) => (
            <BulletinRow key={event.NID} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bulletin;
