import { type FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { locations } from '../../domain/data';

const val = (s: string | null) => s ?? '';

export default function CarsFilters() {
  const [sp, setSp] = useSearchParams();

  const [pickup, setPickup] = useState(val(sp.get('pickup')));
  const [ret, setRet] = useState(val(sp.get('return')));
  const [start, setStart] = useState(val(sp.get('start'))); // "YYYY-MM-DDTHH:mm"
  const [end, setEnd] = useState(val(sp.get('end')));

  const canApply = useMemo(() => {
    if ((start && !end) || (!start && end)) return false;
    if (start && end) return new Date(start) < new Date(end);
    return true;
  }, [start, end]);

  const setOrDelete = (params: URLSearchParams, key: string, value: string) => {
    if (value && value.trim()) params.set(key, value.trim());
    else params.delete(key);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(sp);
    setOrDelete(next, 'pickup', pickup);
    setOrDelete(next, 'return', ret);
    setOrDelete(next, 'start', start);
    setOrDelete(next, 'end', end);
    next.set('page', '1');
    setSp(next);
  };

  const onClear = () => {
    const next = new URLSearchParams(sp);
    ['pickup', 'return', 'start', 'end'].forEach((k) => next.delete(k));
    next.set('page', '1');
    setSp(next);
    setPickup('');
    setRet('');
    setStart('');
    setEnd('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className='mb-6 grid gap-3 rounded-xl shadow-sm bg-white p-4 sm:grid-cols-2 lg:grid-cols-6'
    >
      <label className='flex flex-col gap-1'>
        <span className='text-xs font-medium text-gray-700'>Pickup</span>
        <select
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className='rounded-lg shadow-sm px-3 py-2 text-sm outline-none ring-blue-500/20 focus:ring'
        >
          <option value=''>Anywhere</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.city} • {l.name}
            </option>
          ))}
        </select>
      </label>

      <label className='flex flex-col gap-1'>
        <span className='text-xs font-medium text-gray-700'>Return</span>
        <select
          value={ret}
          onChange={(e) => setRet(e.target.value)}
          className='rounded-lg shadow-sm px-3 py-2 text-sm outline-none ring-blue-500/20 focus:ring'
        >
          <option value=''>Anywhere</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>
              {l.city} • {l.name}
            </option>
          ))}
        </select>
      </label>

      <label className='flex flex-col gap-1'>
        <span className='text-xs font-medium text-gray-700'>Start</span>
        <input
          type='datetime-local'
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className='rounded-lg shadow-sm px-3 py-2 text-sm outline-none ring-blue-500/20 focus:ring'
        />
      </label>

      <label className='flex flex-col gap-1'>
        <span className='text-xs font-medium text-gray-700'>End</span>
        <input
          type='datetime-local'
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className='rounded-lg shadow-sm px-3 py-2 text-sm outline-none ring-blue-500/20 focus:ring'
        />
      </label>

      <div className='flex items-end gap-2 lg:col-span-2'>
        <button
          type='submit'
          disabled={!canApply}
          className='cursor-pointer w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
        >
          Apply
        </button>
        <button
          type='button'
          onClick={onClear}
          className='cursor-pointer w-full rounded-lg shadow-sm px-4 py-2 text-sm font-medium hover:bg-gray-50'
        >
          Clear
        </button>
      </div>
    </form>
  );
}
