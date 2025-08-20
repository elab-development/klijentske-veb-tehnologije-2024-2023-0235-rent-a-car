const BRANDS = [
  'Toyota',
  'Volkswagen',
  'Hyundai',
  'Škoda',
  'Tesla',
  'BMW',
  'Audi',
  'Ford',
  'Mercedes-Benz',
  'Kia',
  'Peugeot',
  'Renault',
  'Opel',
  'Mazda',
  'Honda',
];

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
          {BRANDS.map((b) => (
            <div
              key={b}
              className='flex items-center justify-center rounded-lg border bg-white p-4 hover:shadow-sm transition'
              title={b}
            >
              {/* Use real SVGs later; for now, text badges */}
              <span className='text-gray-700 font-semibold'>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
