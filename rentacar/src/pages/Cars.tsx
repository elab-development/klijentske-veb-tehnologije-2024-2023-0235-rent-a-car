import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { InMemoryCarRepository } from '../domain/rentals';
import { cars } from '../domain/data';
import { toDate } from '../domain/helpers';
import CarCard from '../components/cars/CarCard';
import CarsFilters from '../components/cars/CarsFilters';

const PAGE_SIZE = 6;

const Cars = () => {
  const [sp, setSp] = useSearchParams();
  const makeParam = sp.get('make') ?? undefined;
  const pickupParam = sp.get('pickup') ?? undefined;
  const returnParam = sp.get('return') ?? undefined;
  const startParam = toDate(sp.get('start'));
  const endParam = toDate(sp.get('end'));

  const repo = useMemo(() => new InMemoryCarRepository(cars), []);
  const filtered = useMemo(
    () =>
      repo.search({
        make: makeParam,
        pickupLocationId: pickupParam,
        returnLocationId: returnParam,
        start: startParam,
        end: endParam,
      }),
    [repo, makeParam, pickupParam, returnParam, startParam, endParam]
  );

  const rawPage = parseInt(sp.get('page') || '1', 10);
  const page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    const cur = sp.get('page');
    if (cur !== '1') {
      const next = new URLSearchParams(sp);
      next.set('page', '1');
      setSp(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeParam]);

  useEffect(() => {
    if (page > totalPages) {
      const next = new URLSearchParams(sp);
      next.set('page', String(totalPages));
      setSp(next, { replace: true });
    }
  }, [page, totalPages, sp, setSp]);

  const start = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  const goToPage = (p: number) => {
    const next = new URLSearchParams(sp);
    next.set('page', String(p));
    setSp(next);
  };

  return (
    <main className='mx-auto max-w-7xl px-4 py-8 bg-slate-50'>
      <div className='mb-6 flex items-end justify-between'>
        <h1 className='text-2xl font-bold'>
          {makeParam ? `Cars by ${makeParam}` : 'All Cars'}
        </h1>
        <p className='text-sm text-gray-600'>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      <CarsFilters />

      {filtered.length === 0 ? (
        <div className='rounded-xl shadow-md bg-white p-8 text-center text-gray-600'>
          No cars match your filters.
        </div>
      ) : (
        <>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {paged.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label='Pagination'
              className='mt-8 flex items-center justify-center gap-2'
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type='button'
                  onClick={() => goToPage(p)}
                  aria-current={p === page ? 'page' : undefined}
                  className={[
                    'cursor-pointer rounded-md shadow-sm px-3 py-2 text-sm hover:bg-gray-50 hover:text-blue-600',
                    p === page ? 'bg-blue-600 text-white border-blue-600' : '',
                  ].join(' ')}
                >
                  {p}
                </button>
              ))}
            </nav>
          )}
        </>
      )}
    </main>
  );
};

export default Cars;
