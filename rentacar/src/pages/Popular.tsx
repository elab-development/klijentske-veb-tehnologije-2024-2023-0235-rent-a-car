import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const baseLink =
  'px-3 py-2 rounded-md text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70';
const inactive = 'hover:bg-white/10';
const active = 'bg-white/15 ring-1 ring-white/20';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-50 backdrop-blur',
        'bg-gradient-to-r from-sky-600 to-blue-700 text-white',
        elevated ? 'shadow-md shadow-black/10' : '',
      ].join(' ')}
    >
      <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Link to='/' className='flex items-center gap-2'>
          <span className='inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-700 font-bold shadow-sm'>
            RC
          </span>
          <span className='text-lg font-semibold tracking-tight'>RentCar</span>
        </Link>

        <div className='hidden items-center gap-1 md:flex'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to='/cars'
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Cars
          </NavLink>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to='/popular'
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Popular
          </NavLink>
        </div>

        <div className='hidden md:flex'>
          <a
            href='/cars'
            className='rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
          >
            Browse Cars
          </a>
        </div>

        <button
          aria-label='Toggle menu'
          onClick={() => setOpen((v) => !v)}
          className='inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
        >
          <svg
            className='h-6 w-6'
            viewBox='0 0 24 24'
            stroke='currentColor'
            fill='none'
            strokeWidth='1.8'
          >
            {open ? (
              <path d='M6 18L18 6M6 6l12 12' strokeLinecap='round' />
            ) : (
              <path d='M4 6h16M4 12h16M4 18h16' strokeLinecap='round' />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className='border-t border-white/15 md:hidden'>
          <div className='mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8'>
            <div className='flex flex-col gap-1'>
              <NavLink
                to='/'
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${baseLink} ${
                    isActive ? 'bg-white/15' : 'hover:bg-white/10'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to='/cars'
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${baseLink} ${
                    isActive ? 'bg-white/15' : 'hover:bg-white/10'
                  }`
                }
              >
                Cars
              </NavLink>
              <NavLink
                to='/contact'
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${baseLink} ${
                    isActive ? 'bg-white/15' : 'hover:bg-white/10'
                  }`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to='/popular'
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${baseLink} ${
                    isActive ? 'bg-white/15' : 'hover:bg-white/10'
                  }`
                }
              >
                Popular
              </NavLink>
            </div>
            <a
              href='/cars'
              onClick={() => setOpen(false)}
              className='mt-3 inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50'
            >
              Browse Cars
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
