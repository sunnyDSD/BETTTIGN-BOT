import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useSettingsStore } from '../../lib/store';

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const { settings } = useSettingsStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: settings.timeFormat === '12h',
    };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-background/50">
      <Clock className="h-4 w-4 text-primary" />
      <span className="font-mono text-sm">{formatTime(time)}</span>
    </div>
  );
}