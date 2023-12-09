import { useEffect, useRef } from 'react';

// function useHotKey(listener: (event: KeyboardEvent) => void, key: string) {
//     const listenerRef = useRef(listener);
//     listenerRef.current = listener;

//     useEffect(() => {
//         const callback = (event: KeyboardEvent) => {
//             if (event.key !== key) return;
//             listenerRef.current(event);
//         };
//         window.addEventListener('keydown', callback);
//         return () => window.removeEventListener('keydown', callback);
//     }, [key]);
// }

function useNonRepeatKey(
    listener: (event: KeyboardEvent) => void,
    key: string
) {
    const listenerRef = useRef(listener);
    listenerRef.current = listener;

    const keyHeld = useRef(false);

    useEffect(() => {
        const callbackDown = (event: KeyboardEvent) => {
            if (event.key !== key) return;
            if (keyHeld.current === true) return;
            keyHeld.current = true;
            listenerRef.current(event);
        };

        const callbackUp = (event: KeyboardEvent) => {
            if (event.key !== key) return;
            keyHeld.current = false;
        };

        addEventListener('keydown', callbackDown);
        addEventListener('keyup', callbackUp);

        return () => {
            removeEventListener('keydown', callbackDown);
            removeEventListener('keyup', callbackUp);
        };
    }, [key]);
}

export { useNonRepeatKey };
