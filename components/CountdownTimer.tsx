import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  startDate: string | Date;
}

function getTimeRemaining(target: Date) {
  const now = new Date();
  const total = target.getTime() - now.getTime();
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, completed: false };
}

const periods = [
  { label: '3 Months', months: 3 },
  { label: '6 Months', months: 6 },
  { label: '1 Year', months: 12 },
];

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startDate }) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const baseDate = new Date(startDate);

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap flex md:justify-center md:overflow-visible md:whitespace-normal">
      {periods.map((period) => {
        const target = new Date(baseDate);
        target.setMonth(target.getMonth() + period.months);
        const { days, hours, minutes, seconds, completed } = getTimeRemaining(target);
        return (
          <div
            key={period.label}
            className="inline-block align-top min-w-[250px] max-w-xs mx-2 flex-shrink-0 flex flex-col items-center bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-4 md:static md:min-w-0 md:mx-0"
          >
            <div className="font-bold text-lg mb-1">{period.label} Countdown</div>
            {completed ? (
              <div className="text-green-700 font-bold text-xl">Completed</div>
            ) : (
              <div className="flex gap-2 text-2xl font-mono">
                <span className="text-yellow-400">{days}</span><span>d</span> <span>:</span>
                <span className="text-yellow-400">{hours}</span><span>h</span> <span>:</span>
                <span className="text-yellow-400">{minutes}</span><span>m</span> <span>:</span>
                <span className="text-yellow-400">{seconds}</span><span>s</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CountdownTimer; 