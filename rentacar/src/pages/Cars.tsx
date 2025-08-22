import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { InMemoryCarRepository } from '../domain/rentals';
import { cars } from '../domain/data';
import CarCard from '../components/cars/CarCard';

const Cars = () => {
  const [sp] = useSearchParams();
  const makeParam = sp.get('make') ?? undefined;

  const repo = useMemo(() => new InMemoryCarRepository(cars), []);
  const filtered = useMemo(
    () => repo.search({ make: makeParam }),
    [repo, makeParam]
  );

  return (
    <main className='mx-auto max-w-7xl px-4 py-8'>
      <div className='mb-6 flex items-end justify-between'>
        <h1 className='text-2xl font-bold'>
          {makeParam ? `Cars by ${makeParam}` : 'All Cars'}
        </h1>
        <p className='text-sm text-gray-600'>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className='rounded-xl border bg-white p-8 text-center text-gray-600'>
          No cars match your filters.
        </div>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Cars;
