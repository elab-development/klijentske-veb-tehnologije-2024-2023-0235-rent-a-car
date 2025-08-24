import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { InMemoryCarRepository } from '../domain/rentals';
import { cars, locations } from '../domain/data';

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();

  const repo = useMemo(() => new InMemoryCarRepository(cars), []);
  const car = useMemo(() => (id ? repo.findById(id) : undefined), [repo, id]);

  const locById = useMemo(() => new Map(locations.map((l) => [l.id, l])), []);

  if (!car) {
    return (
      <main className='mx-auto max-w-3xl px-4 py-12'>
        <div className='rounded-xl shadow-sm bg-white p-8 text-center'>
          <h1 className='text-xl font-semibold'>Car not found</h1>
          <p className='mt-2 text-gray-600'>
            We couldn’t find a car with id{' '}
            <span className='font-mono'>{id}</span>.
          </p>
          <Link
            to='/cars'
            className='mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700'
          >
            Back to Cars
          </Link>
        </div>
      </main>
    );
  }

  const imgSrc = `${import.meta.env.BASE_URL}${(car.imageUrl ?? '').replace(
    /^\//,
    ''
  )}`;
  const pickupNames = car.pickupLocationIds
    .map((lid) => locById.get(lid))
    .filter(Boolean)
    .map((l) => `${l!.city} • ${l!.name}`)
    .join(', ');
  const returnNames = car.returnLocationIds
    .map((lid) => locById.get(lid))
    .filter(Boolean)
    .map((l) => `${l!.city} • ${l!.name}`)
    .join(', ');

  return (
    <main className='mx-auto max-w-7xl px-4 py-8'>
      <div className='mb-6'>
        <Link
          to='/cars'
          className='inline-flex items-center gap-2 text-sm text-blue-700 hover:underline'
        >
          ← Back to cars
        </Link>
      </div>

      <div className='grid gap-8 lg:grid-cols-2'>
        <div className='overflow-hidden rounded-2xl shadow-sm bg-white shadow-sm'>
          <div className='w-full h-full bg-gray-100'>
            <img
              src={imgSrc}
              alt={`${car.make} ${car.model}`}
              className='h-full w-full object-cover'
            />
          </div>
        </div>

        <div className='rounded-2xl shadow-sm bg-white p-6 shadow-sm'>
          <h1 className='text-2xl font-bold'>
            {car.make} {car.model}
          </h1>
          <p className='mt-1 text-gray-600'>{car.year}</p>

          <dl className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='rounded-lg bg-gray-50 p-4'>
              <dt className='text-xs font-medium text-gray-500'>Fuel</dt>
              <dd className='text-sm font-semibold capitalize'>{car.fuel}</dd>
            </div>
            <div className='rounded-lg bg-gray-50 p-4'>
              <dt className='text-xs font-medium text-gray-500'>
                Transmission
              </dt>
              <dd className='text-sm font-semibold capitalize'>
                {car.transmission}
              </dd>
            </div>
            <div className='rounded-lg bg-gray-50 p-4'>
              <dt className='text-xs font-medium text-gray-500'>Seats</dt>
              <dd className='text-sm font-semibold'>{car.seats}</dd>
            </div>
            <div className='rounded-lg bg-gray-50 p-4'>
              <dt className='text-xs font-medium text-gray-500'>
                Price per hour
              </dt>
              <dd className='text-sm font-semibold'>${car.pricePerHour}</dd>
            </div>
          </dl>

          <div className='mt-6 space-y-3'>
            <div>
              <div className='text-xs font-medium text-gray-500'>
                Pickup locations
              </div>
              <div className='text-sm'>{pickupNames || '—'}</div>
            </div>
            <div>
              <div className='text-xs font-medium text-gray-500'>
                Return locations
              </div>
              <div className='text-sm'>{returnNames || '—'}</div>
            </div>
          </div>

          <div className='mt-8'>
            <button
              type='button'
              className='w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700'
              disabled
              title='Coming soon'
            >
              Book this car
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
