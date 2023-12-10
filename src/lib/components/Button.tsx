import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

function Button({
    children,
    className = '',
    ...otherProps
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
    return (
        <button
            className={`${className} button-colors rounded-md p-2 transition md:text-xl xl:text-2xl`}
            {...otherProps}>
            {children}
        </button>
    );
}

export default Button;
