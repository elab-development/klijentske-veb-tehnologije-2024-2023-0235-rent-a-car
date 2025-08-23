export default function Footer() {
  return (
    <footer className='mt-16 bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 text-white'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <div className='flex items-center gap-2'>
              <span className='inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-700 font-bold shadow-sm'>
                RC
              </span>
              <span className='text-lg font-semibold tracking-tight'>
                RentCar
              </span>
            </div>
            <p className='mt-3 text-sm text-blue-100/90'>
              Flexible car rentals across Serbia—transparent pricing, modern
              fleet, and easy pickups.
            </p>
          </div>

          <div>
            <h4 className='text-sm font-semibold'>Company</h4>
            <ul className='mt-3 space-y-2 text-sm text-blue-100/90'>
              <li>
                <a href='/about' className='hover:text-white'>
                  About
                </a>
              </li>
              <li>
                <a href='/careers' className='hover:text-white'>
                  Careers
                </a>
              </li>
              <li>
                <a href='/press' className='hover:text-white'>
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-sm font-semibold'>Support</h4>
            <ul className='mt-3 space-y-2 text-sm text-blue-100/90'>
              <li>
                <a href='/contact' className='hover:text-white'>
                  Contact
                </a>
              </li>
              <li>
                <a href='/help' className='hover:text-white'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='/insurance' className='hover:text-white'>
                  Insurance
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-sm font-semibold'>Legal</h4>
            <ul className='mt-3 space-y-2 text-sm text-blue-100/90'>
              <li>
                <a href='/terms' className='hover:text-white'>
                  Terms
                </a>
              </li>
              <li>
                <a href='/privacy' className='hover:text-white'>
                  Privacy
                </a>
              </li>
              <li>
                <a href='/cookies' className='hover:text-white'>
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-10 border-t border-white/15 pt-6 text-xs text-blue-100/80 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p>© {new Date().getFullYear()} RentCar. All rights reserved.</p>
          <div className='flex gap-4'>
            <a href='https://x.com' className='hover:text-white'>
              Twitter/X
            </a>
            <a href='https://instagram.com' className='hover:text-white'>
              Instagram
            </a>
            <a href='https://facebook.com' className='hover:text-white'>
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
