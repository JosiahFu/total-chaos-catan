import { useLayoutEffect, useState } from 'react';
import { Phase } from '../lib/data';
import { useWatch } from '../lib/useWatch';

function PieTimer({
    length,
    phase,
    onEnd,
    endSound,
    className,
}: {
    length: number;
    phase: Phase;
    onEnd?: () => void;
    endSound?: HTMLAudioElement | undefined;
    className?: string;
}) {
    const [reset, setReset] = useState(true);

    useWatch(() => {
        setReset(true);
        if (!onEnd) return;
        const timeout = setTimeout(() => {
            endSound?.play();
            onEnd();
        }, length * 1000);
        return () => clearTimeout(timeout);
    }, phase);

    useLayoutEffect(() => {
        if (reset) setReset(false);
    }, [reset]);

    return (
        <div
            className={`rounded-full bg-black/25 p-4 ease-linear lg:p-8 ${
                className ?? ''
            }`}>
            <svg
                viewBox='0 0 4 4'
                xmlns='http://www.w3.org/2000/svg'
                className='max-h-full max-w-full'>
                {reset ? undefined : (
                    <circle
                        className='origin-center -rotate-90 animate-pie'
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

export default PieTimer;
