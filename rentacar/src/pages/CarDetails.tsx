import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { AvailabilityService, InMemoryCarRepository } from '../domain/rentals';
import { cars, locations } from '../domain/data';
import { readStored } from '../domain/localStorage';
import {
  calculateRentalPrice,
  fetchCurrencies,
  fetchRate,
  convertWithRate,
  formatCurrency,
} from '../domain/pricing';

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const repo = useMemo(() => new InMemoryCarRepository(cars), []);
  const car = useMemo(() => (id ? repo.findById(id) : undefined), [repo, id]);

  const locById = useMemo(() => new Map(locations.map((l) => [l.id, l])), []);
  const availability = useMemo(() => new AvailabilityService(), []);

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

  const allowedPickup = car.pickupLocationIds;
  const allowedReturn = car.returnLocationIds;

  const stored = readStored();
  const initialPickup =
    stored.pickup && allowedPickup.includes(stored.pickup)
      ? stored.pickup
      : allowedPickup[0] ?? '';
  const initialReturn =
    stored.return && allowedReturn.includes(stored.return)
      ? stored.return
      : allowedReturn[0] ?? '';

  const [pickup, setPickup] = useState<string>(initialPickup);
  const [ret, setRet] = useState<string>(initialReturn);
  const [start, setStart] = useState<string>(stored.start ?? '');
  const [end, setEnd] = useState<string>(stored.end ?? '');

  const startDate = start ? new Date(start) : undefined;
  const endDate = end ? new Date(end) : undefined;

  const validRange = !!(startDate && endDate && startDate < endDate);
  const canCheck = validRange;

  const isAvailable = canCheck
    ? availability.isAvailable(car, startDate!, endDate!)
    : false;

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

  const imgSrc = `${import.meta.env.BASE_URL}${(car.imageUrl ?? '').replace(
    /^\//,
    ''
  )}`;

  const onBook = () => {
    if (!canCheck || !isAvailable || !pickup || !ret) return;

    car.bookings.push({
      carId: car.id,
      pickupLocationId: pickup,
      returnLocationId: ret,
      start: startDate!,
      end: endDate!,
    });

    navigate('/');
  };

  const [currencies, setCurrencies] = useState<Record<string, string>>({});
  const [currency, setCurrency] = useState('USD');
  const [rate, setRate] = useState(1);

  useMemo(() => {
    fetchCurrencies()
      .then(setCurrencies)
      .catch(() => setCurrencies({ USD: 'US Dollar' }));
  }, []);

  useMemo(() => {
    let ignore = false;
    (async () => {
      try {
        const r = await fetchRate('USD', currency);
        if (!ignore) setRate(r);
      } catch {
        if (!ignore) setRate(1);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [currency]);

  const price = useMemo(() => {
    if (!canCheck) return null;
    return calculateRentalPrice(startDate!, endDate!, car.pricePerHour);
  }, [start, end, car.pricePerHour, canCheck]);

  const unitConverted = convertWithRate(car.pricePerHour, rate);
  const baseConverted = price ? convertWithRate(price.base, rate) : 0;
  const discountConverted = price ? convertWithRate(price.discount, rate) : 0;
  const totalConverted = price ? convertWithRate(price.total, rate) : 0;

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
        <div className='rounded-2xl bg-white shadow-sm overflow-hidden'>
          <div className='w-full h-full overflow-hidden'>
            <img
              src={imgSrc}
              alt={`${car.make} ${car.model}`}
              className='h-full w-full object-cover'
            />
          </div>
        </div>

        <div className='rounded-2xl bg-white p-6 shadow-sm'>
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

          <form className='mt-8 grid gap-3 rounded-xl shadow-sm bg-white p-4 sm:grid-cols-2'>
            <label className='flex flex-col gap-1'>
              <span className='text-xs font-medium text-gray-700'>Pickup</span>
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className='cursor-pointer rounded-lg shadow-sm px-3 py-2 text-sm outline-none ring-blue-500/20 focus:ring'
              >
                {allowedPickup.map((id) => {
                  const l = locById.get(id)!;
                  return (
                    <option key={id} value={id}>
                      {l.city} • {l.name}
                    </option>
                  );
                })}
              </select>
            </label>

            <label className='flex flex-col gap-1'>
              <span className='text-xs font-medium text-gray-700'>Return</span>
              <select
                value={ret}
                onChange={(e) => setRet(e.target.value)}
                className='cursor-pointer rounded-lg shadow-sm px-3 py-2 text-sm outline-none ring-blue-500/20 focus:ring'
              >
                {allowedReturn.map((id) => {
                  const l = locById.get(id)!;
                  return (
                    <option key={id} value={id}>
                      {l.city} • {l.name}
                    </option>
                  );
                })}
              </select>
            </label>

            <label className='flex flex-col gap-1'>
              <span className='text-xs font-medium text-gray-700'>Start</span>
              <input
                type='datetime-local'
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className='cursor-pointer rounded-lg shadow-sm px-3 py-2 text-sm outline-none ring-blue-500/20 focus:ring'
              />
            </label>

            <label className='flex flex-col gap-1'>
              <span className='text-xs font-medium text-gray-700'>End</span>
              <input
                type='datetime-local'
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className='cursor-pointer rounded-lg shadow-sm px-3 py-2 text-sm outline-none ring-blue-500/20 focus:ring'
              />
            </label>
          </form>

          <div className='mt-4 flex items-center justify-between'>
            <div className='text-sm'>
              {!canCheck && (
                <span className='text-gray-500'>
                  Select valid dates to check availability
                </span>
              )}
              {canCheck && isAvailable && (
                <span className='text-emerald-700 font-medium'>Available</span>
              )}
              {canCheck && !isAvailable && (
                <span className='text-red-600 font-medium'>
                  Unavailable for these dates
                </span>
              )}
            </div>

            <button
              type='button'
              onClick={onBook}
              disabled={!canCheck || !isAvailable || !pickup || !ret}
              className={[
                'cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold',
                !canCheck || !isAvailable
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700',
              ].join(' ')}
            >
              {!canCheck || !isAvailable ? 'Unavailable' : 'Book this car'}
            </button>
          </div>

          <div className='mt-6 flex items-center justify-end'>
            <label className='text-sm text-gray-600 mr-2'>Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className='rounded-md shadow-sm px-2 py-1 text-sm outline-none focus:ring ring-blue-500/20'
            >
              {Object.keys(currencies)
                .sort()
                .map((code) => (
                  <option key={code} value={code}>
                    {code} — {currencies[code]}
                  </option>
                ))}
            </select>
          </div>

          <div className='mt-2 text-sm w-full'>
            {price && price.hours > 0 && (
              <div className='rounded-md bg-gray-50 p-3 text-sm'>
                <div className='flex items-center justify-between'>
                  <span>
                    {price.days > 0 ? `${price.days}d ` : ''}
                    {price.remainingHours}h ×{' '}
                    {formatCurrency(unitConverted, currency)}
                  </span>
                  <span className='font-medium'>
                    {formatCurrency(baseConverted, currency)}
                  </span>
                </div>
                {price.discountRate > 0 && (
                  <div className='mt-1 flex items-center justify-between text-gray-600'>
                    <span>
                      Long-rent Discount ({Math.round(price.discountRate * 100)}
                      %)
                    </span>
                    <span>- {formatCurrency(discountConverted, currency)}</span>
                  </div>
                )}
                <div className='mt-2 flex items-center justify-between font-semibold'>
                  <span>Total</span>
                  <span>{formatCurrency(totalConverted, currency)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
