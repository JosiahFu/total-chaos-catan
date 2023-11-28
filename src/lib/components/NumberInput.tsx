import { InputHTMLAttributes } from 'react';
import Input from './Input';

function NumberInput({
    value,
    onChange,
    className,
    ...otherProps
}: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'type'
> & {
    value?: number;
    onChange?: (value: number) => void;
}) {
    const handleChange = onChange
        ? (value: string) => {
              const number = parseFloat(value);
              if (isNaN(number)) return;
              onChange(number);
          }
        : undefined;

    return (
        <Input
            type='number'
            className={`${className} w-16`}
            value={value}
            onChange={handleChange}
            {...otherProps}
        />
    );
}

export default NumberInput;
