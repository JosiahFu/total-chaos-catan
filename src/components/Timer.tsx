import { useEffect, useLayoutEffect, useState } from 'react';
import { Phase } from '../data';

function Timer({
    length,
    phase,
    onEnd,
    className,
}: {
    length: number;
    phase: Phase;
    onEnd?: () => void;
    className?: string;
}) {
    const [reset, setReset] = useState(true);

    useEffect(() => {
        setReset(true);
        if (!onEnd) return;
        const timeout = setTimeout(onEnd, length * 1000);
        return () => clearTimeout(timeout);
    }, [length, onEnd, phase]); // Should update every time phase changes

    useLayoutEffect(() => {
        if (reset) setReset(false);
    }, [reset]);

    return (
        <div
            className={`rounded-full p-4 lg:p-8 ease-linear bg-black/25 ${
                className ?? ''
            }`}>
            <svg
                viewBox='0 0 4 4'
                xmlns='http://www.w3.org/2000/svg'
                className='max-h-full max-w-full'>
                {reset ? undefined : (
                    <circle
                        className='-rotate-90 origin-center animate-pie'
                        style={{ animationDuration: `${length}s` }}
                        strokeWidth='2'
                        fill='none'
                        cx='2'
                        cy='2'
                        r='1'
                    />
                )}
            </svg>
        </div>
    );
}

export default Timer;
