import { brands } from '../../domain/data';
import BrandCard from './BrandCard';

export default function BrandStrip() {
  return (
    <section id='brands' className='py-14 sm:py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 className='text-center text-sm font-semibold text-gray-500'>
          Trusted brands
        </h2>
        <p className='mt-2 text-center text-2xl font-bold tracking-tight'>
          A fleet from the world’s most reliable manufacturers
        </p>

        <div className='mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6'>
          {brands.map((brand) => (
            <BrandCard brand={brand} key={brand.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
