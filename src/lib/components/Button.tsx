import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

function Button({
    children,
    className,
    ...otherProps
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
    return (
        <button
            className={`${
                className ?? ''
            } rounded-md bg-black/25 p-2 transition-colors hover:bg-black/20 active:bg-black/30 disabled:bg-black/10 disabled:hover:bg-black/10 md:text-xl xl:text-2xl`}
            {...otherProps}>
            {children}
        </button>
    );
}

export default Button;
