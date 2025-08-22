import { Link } from 'react-router-dom';

import type { Car } from '../../domain/rentals';

type CarCardProps = {
  car: Car;
};

const CarCard = ({ car }: CarCardProps) => {
  return (
    <Link
      key={car.id}
      to={`/cars/${car.id}`}
      className='group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500'
    >
      <div className='aspect-[16/10] w-full bg-gray-100'>
        <img
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          className='h-full w-full object-cover transition group-hover:scale-[1.02]'
          loading='lazy'
        />
      </div>
      <div className='p-5'>
        <div className='flex items-center justify-between gap-3'>
          <h3 className='text-base font-semibold'>
            {car.make} {car.model}
          </h3>
          <span className='rounded-md bg-gray-100 px-2 py-1 text-xs font-medium'>
            ${car.pricePerHour}/h
          </span>
        </div>
        <p className='mt-1 text-sm text-gray-600'>
          {car.year} • {car.transmission} • {car.fuel} • {car.seats} seats
        </p>
      </div>
    </Link>
  );
};

export default CarCard;
