import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { InMemoryCarRepository } from '../domain/rentals';
import { cars } from '../domain/data';

const Cars = () => {
  const [sp] = useSearchParams();
  const makeParam = sp.get('make') ?? undefined;

  const repo = useMemo(() => new InMemoryCarRepository(cars), []);
  const filtered = useMemo(
    () => repo.search({ make: makeParam }),
    [repo, makeParam]
  );

  console.log('Filtered Cars:', filtered);

  return (
    <main className='mx-auto max-w-7xl px-4 py-8'>
      <h1 className='text-2xl font-bold'>
        {makeParam ? `Cars by ${makeParam}` : 'All Cars'}
      </h1>
    </main>
  );
};

export default Cars;
