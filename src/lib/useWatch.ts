import { EffectCallback, useEffect, useRef } from 'react';

function useWatch<T>(callback: EffectCallback, dependency: T) {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;
    useEffect(() => {
        return callbackRef.current();
    }, [dependency]);
}

export { useWatch };
