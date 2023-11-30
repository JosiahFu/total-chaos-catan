import { useEffect, useState } from 'react';
import { Phase } from '../lib/data';
import { useWatch } from '../lib/useWatch';

function CountdownTimer({
    phase,
    length,
    className,
}: {
    phase: Phase;
    length: number;
    className?: string;
}) {
    const [endTime, setEndTime] = useState<number>(Date.now);
    const [now, setNow] = useState(Date.now);

    useWatch(() => {
        setEndTime(Date.now() + length * 1000);
    }, phase);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        });
        return () => clearInterval(interval);
    });

    const remaining = Math.max(endTime - now, 0) + 1000; // Time should not go below 0
    const seconds = Math.floor(remaining / 1000);

    return (
        <div className={`${className ?? ''} text-center font-bold`}>
            {seconds}
        </div>
    );
}

export default CountdownTimer;
