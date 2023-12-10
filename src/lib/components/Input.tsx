import { InputHTMLAttributes } from 'react';

function Input({
    onChange,
    className = '',
    ...otherProps
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    onChange?: (value: string) => void;
}) {
    return (
        <input
            className={`${className} rounded-lg bg-black/10 px-2 py-1 transition focus:bg-black/20 focus:outline-none`}
            onChange={
                onChange ? event => onChange(event.target.value) : undefined
            }
            {...otherProps}
        />
    );
}

export default Input;
