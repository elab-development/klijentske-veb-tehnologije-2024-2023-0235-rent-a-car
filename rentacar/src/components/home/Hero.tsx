import { Link } from 'react-router-dom';

import HeroImg from '/images/hero.jpg';

export default function Hero() {
  return (
    <section className='relative isolate' aria-label='Hero'>
      <div
        className='absolute inset-0 -z-10 bg-cover bg-center'
        style={{ backgroundImage: `url(${HeroImg})` }}
      />
      <div className='absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/30 to-transparent' />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 sm:py-36'>
        <div className='max-w-2xl text-white'>
          <h1 className='text-4xl sm:text-5xl font-bold tracking-tight'>
            Your ride, ready when you are.
          </h1>
          <p className='mt-4 text-lg text-white/90'>
            Flexible car rentals across Serbia. Pick up in one city, return in
            another—no hassle.
          </p>
          <div className='mt-8 flex items-center gap-3'>
            <Link
              to='/cars'
              className='inline-flex items-center justify-center rounded-md bg-white text-black px-5 py-3 font-medium shadow hover:shadow-md transition'
            >
              Browse Cars
            </Link>
            <a
              href='#brands'
              className='inline-flex items-center justify-center rounded-md border border-white/40 px-5 py-3 font-medium text-white hover:bg-white/10 transition'
            >
              Our Brands
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
