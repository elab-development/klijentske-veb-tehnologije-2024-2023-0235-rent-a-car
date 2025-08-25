import { useMemo } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import {
  BLUE,
  countBookingsByMonth,
  countBookingsPerMake,
  countBookingsPerModel,
  countBookingsPerTransmission,
  INDIGO,
  PIE_COLORS,
  SKY,
  topN,
} from '../utils/stats';
import { cars } from '../domain/data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Popular() {
  const modelCounts = useMemo(() => countBookingsPerModel(cars), []);
  const modelLabels = useMemo(() => Object.keys(modelCounts), [modelCounts]);
  const modelData = useMemo(
    () => modelLabels.map((k) => modelCounts[k]),
    [modelLabels, modelCounts]
  );

  const makeTop5 = useMemo(() => topN(countBookingsPerMake(cars), 5), []);
  const makeLabels = makeTop5.map(([k]) => k);
  const makeData = makeTop5.map(([, v]) => v);

  const transCounts = useMemo(() => countBookingsPerTransmission(cars), []);
  const transLabels = Object.keys(transCounts);
  const transData = transLabels.map((k) => transCounts[k]);

  const monthCounts = useMemo(() => {
    const m = countBookingsByMonth(cars);
    return Object.entries(m).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);
  const monthLabels = monthCounts.map(([k]) => k);
  const monthData = monthCounts.map(([, v]) => v);

  return (
    <main className='mx-auto max-w-7xl px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Popular Cars</h1>

      <section className='mb-8 rounded-xl shadow-sm bg-white p-4'>
        <h2 className='mb-3 text-lg font-semibold'>Bookings per model (all)</h2>
        <Bar
          data={{
            labels: modelLabels,
            datasets: [
              {
                label: 'Bookings',
                data: modelData,
                backgroundColor: SKY,
                borderColor: SKY,
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
          }}
        />
      </section>

      <section className='mb-8 rounded-xl shadow-sm bg-white p-4'>
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Top 5 makes by bookings</h2>
        </div>
        <Bar
          data={{
            labels: makeLabels,
            datasets: [
              {
                label: 'Bookings',
                data: makeData,
                backgroundColor: BLUE,
                borderColor: BLUE,
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
          }}
        />
      </section>

      <section className='mb-8 rounded-xl shadow-sm bg-white p-4'>
        <h2 className='mb-3 text-lg font-semibold'>Bookings by transmission</h2>
        <div className='max-w-md'>
          <Pie
            data={{
              labels: transLabels.map((t) => t[0].toUpperCase() + t.slice(1)),
              datasets: [
                {
                  data: transData,
                  backgroundColor: PIE_COLORS.slice(0, transLabels.length),
                  borderColor: '#ffffff',
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              plugins: { legend: { position: 'bottom' } },
            }}
          />
        </div>
      </section>

      {/* Monthly trend */}
      <section className='mb-8 rounded-xl shadow-sm bg-white p-4'>
        <h2 className='mb-3 text-lg font-semibold'>
          Bookings by month (timeline)
        </h2>
        <Line
          data={{
            labels: monthLabels,
            datasets: [
              {
                label: 'Bookings',
                data: monthData,
                borderColor: INDIGO,
                backgroundColor: 'rgba(99,102,241,0.15)',
                fill: true,
                tension: 0.25,
                pointRadius: 3,
                pointBackgroundColor: INDIGO,
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              y: { beginAtZero: true, ticks: { precision: 0 } },
            },
          }}
        />
      </section>
    </main>
  );
}
