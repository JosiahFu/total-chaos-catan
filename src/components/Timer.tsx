import { useEffect, useLayoutEffect, useState } from 'react';
import { Phase } from '../data';

function Timer({length, phase, onEnd}: {
    length: number,
    phase: Phase,
    onEnd?: () => void,
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
        <div className='rounded-full p-4 ease-linear'>
            <svg viewBox="0 0 4 4" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                {reset ? undefined :
                    <circle 
                        className={`-rotate-90 origin-center animate-pie`}
                        style={{animationDuration: `${length}s`}}
                        stroke="#00acc1" strokeWidth="2" fill="none" cx="2" cy="2" r="1" />
                }
            </svg>
        </div>
    );
    
}

export default Timer;
