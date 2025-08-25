import { type FormEvent, useState } from 'react';
import { locations } from '../domain/data';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initial: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const [data, setData] = useState<ContactFormData>(initial);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onChange =
    (key: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((d) => ({ ...d, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const validate = () => {
    const er: Partial<ContactFormData> = {};
    if (!data.name.trim()) er.name = 'Please enter your name';
    if (!data.email.trim()) er.email = 'Please enter your email';
    if (!data.message.trim()) er.message = 'Please add a message';
    return er;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setDone(true);
    setData(initial);
  };

  return (
    <main className='mx-auto max-w-7xl px-4 py-8'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Contact us</h1>
        <p className='mt-2 text-gray-600'>
          Questions about bookings, billing, or partnerships? Drop us a line.
        </p>
      </header>

      <div className='grid gap-8 lg:grid-cols-3'>
        <section className='lg:col-span-2 rounded-xl shadow-sm bg-white p-6'>
          {done && (
            <div className='mb-4 rounded-md bg-emerald-50 px-4 py-3 text-emerald-800 text-sm'>
              Thanks! We received your message and will get back to you soon.
            </div>
          )}

          <form onSubmit={onSubmit} className='grid grid-cols-1 gap-4'>
            <div>
              <label
                className='text-sm font-medium text-gray-700'
                htmlFor='name'
              >
                Name
              </label>
              <input
                id='name'
                type='text'
                value={data.name}
                onChange={onChange('name')}
                className='mt-1 w-full rounded-lg shadow-sm px-3 py-2 text-sm outline-none focus:ring ring-blue-500/20'
                placeholder='Your full name'
              />
              {errors.name && (
                <p className='mt-1 text-xs text-red-600'>{errors.name}</p>
              )}
            </div>

            <div>
              <label
                className='text-sm font-medium text-gray-700'
                htmlFor='email'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                value={data.email}
                onChange={onChange('email')}
                className='mt-1 w-full rounded-lg shadow-sm px-3 py-2 text-sm outline-none focus:ring ring-blue-500/20'
                placeholder='you@example.com'
              />
              {errors.email && (
                <p className='mt-1 text-xs text-red-600'>{errors.email}</p>
              )}
            </div>

            <div>
              <label
                className='text-sm font-medium text-gray-700'
                htmlFor='subject'
              >
                Subject <span className='text-gray-400'>(optional)</span>
              </label>
              <input
                id='subject'
                type='text'
                value={data.subject}
                onChange={onChange('subject')}
                className='mt-1 w-full rounded-lg shadow-sm px-3 py-2 text-sm outline-none focus:ring ring-blue-500/20'
                placeholder='How can we help?'
              />
            </div>

            <div>
              <label
                className='text-sm font-medium text-gray-700'
                htmlFor='message'
              >
                Message
              </label>
              <textarea
                id='message'
                rows={6}
                value={data.message}
                onChange={onChange('message')}
                className='mt-1 w-full rounded-lg shadow-sm px-3 py-2 text-sm outline-none focus:ring ring-blue-500/20'
                placeholder='Write your message here...'
              />
              {errors.message && (
                <p className='mt-1 text-xs text-red-600'>{errors.message}</p>
              )}
            </div>

            <div className='flex items-center justify-end'>
              <button
                type='submit'
                disabled={submitting}
                className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60'
              >
                {submitting ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        </section>

        <aside className='rounded-xl shadow-sm bg-white p-6'>
          <h2 className='text-lg font-semibold'>Get in touch</h2>
          <ul className='mt-4 space-y-3 text-sm'>
            <li className='flex items-start gap-3'>
              <svg
                className='mt-0.5 h-5 w-5 text-blue-600'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M2 6l10 7L22 6v12H2z' />
                <path d='M22 6l-10 7L2 6h20z' />
              </svg>
              <div>
                <div className='font-medium'>Email</div>
                <a
                  href='mailto:support@rentcar.example'
                  className='text-blue-700 hover:underline'
                >
                  support@rentcar.example
                </a>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <svg
                className='mt-0.5 h-5 w-5 text-blue-600'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.2c1.2.5 2.6.8 4 .8a1 1 0 011 1V20a1 1 0 01-1 1C11.8 21 3 12.2 3 1a1 1 0 011-1h2.2a1 1 0 011 1c0 1.4.3 2.8.8 4a1 1 0 01-.2 1.1L6.6 10.8z' />
              </svg>
              <div>
                <div className='font-medium'>Phone</div>
                <a
                  href='tel:+3811234567'
                  className='text-blue-700 hover:underline'
                >
                  +381 12 345 67
                </a>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <svg
                className='mt-0.5 h-5 w-5 text-blue-600'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' />
              </svg>
              <div>
                <div className='font-medium'>Pickup points</div>
                <ul className='mt-1 text-gray-600'>
                  {locations.map((l) => (
                    <li key={l.id}>
                      <span className='font-medium text-gray-800'>
                        {l.city}
                      </span>{' '}
                      — {l.name}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <svg
                className='mt-0.5 h-5 w-5 text-blue-600'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M5 4h14v2H5zM5 9h14v2H5zM5 14h10v2H5z' />
              </svg>
              <div>
                <div className='font-medium'>Hours</div>
                <p className='text-gray-600'>Mon–Sun, 08:00–20:00</p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
