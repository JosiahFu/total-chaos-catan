import { HTMLAttributes, useEffect, useLayoutEffect, useRef } from 'react';

function FitText({
    children,
    className,
    ...otherProps
}: Omit<HTMLAttributes<HTMLSpanElement>, 'style' | 'ref'>) {
    const span = useRef<HTMLSpanElement>(null);

    const resize = () => {
        if (!span.current) return;
        span.current.style.fontSize = '';
        const currentHeight = span.current.clientHeight;
        span.current.style.height = '100%';
        const fullHeight = span.current.clientHeight;
        span.current.style.height = '';
        span.current.style.fontSize = `${fullHeight / (currentHeight / 10)}px`;
    };

    useLayoutEffect(() => {
        resize();
    });

    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <span
            className={`text-[10px] leading-4 ${className}`}
            ref={span}
            {...otherProps}>
            {children}
        </span>
    );
}

export default FitText;
