import { HTMLAttributes, PropsWithChildren } from 'react';

function Button({
    children,
    className,
    ...otherProps
}: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) {
    return (
        <button
            className={`bg-black/25 p-2 rounded-md hover:bg-black/20 active:bg-black/30 transition-colors ${className}`}
            {...otherProps}>
            {children}
        </button>
    );
}

export default Button;
