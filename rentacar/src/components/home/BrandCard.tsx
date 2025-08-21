import { Link } from 'react-router-dom';

import type { Brand } from '../../domain/rentals';

type BrandCardProps = {
  brand: Brand;
};

export default function BrandCard({ brand }: BrandCardProps) {
  const src = brand.logoUrl;

  return (
    <Link
      to={`/cars?make=${encodeURIComponent(brand.name)}`}
      className='group flex items-center justify-center rounded-lg border bg-white p-4 transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
      title={`Show ${brand.name} cars`}
      aria-label={`Show ${brand.name} cars`}
    >
      <img src={src} alt={`${brand.name} logo`} loading='lazy' />
      <span className='sr-only'>{brand.name}</span>
    </Link>
  );
}
