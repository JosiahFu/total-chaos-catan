import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

function CircleButton({
    children,
    className = '',
    ...otherProps
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
    return (
        <button
            className={`${className} button-colors h-6 w-6 rounded-full text-center text-base lg:h-8 lg:w-8 lg:text-xl`}
            {...otherProps}>
            {children}
        </button>
    );
}

export default CircleButton;
