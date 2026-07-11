import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadBulletin } from './bulletin.slice';

const BulletinSummary = () => {
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

  const firstEvent = events[0];

  return (
    <section aria-labelledby="bulletin-title">
      <h2 id="bulletin-title">Bahis Bülteni</h2>
      <p>{events.length} etkinlik yüklendi.</p>
      <p>
        İlk etkinlik: {firstEvent.C} {firstEvent.N}
      </p>
    </section>
  );
};

export default BulletinSummary;
