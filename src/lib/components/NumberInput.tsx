import {
    FocusEventHandler,
    InputHTMLAttributes,
    useEffect,
    useState,
} from 'react';
import Input from './Input';

function NumberInput({
    value,
    onChange,
    className,
    ...otherProps
}: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onBlur' | 'onChange' | 'value' | 'type'
> & {
    value?: number;
    onChange?: (value: number) => void;
}) {
    const [innerValue, setInnerValue] = useState<string | undefined>(
        value?.toString()
    );

    useEffect(() => {
        setInnerValue(value?.toString());
    }, [value]);

    const handleBlur: FocusEventHandler<HTMLInputElement> | undefined = onChange
        ? () => {
              if (innerValue === undefined) return;
              const number = parseFloat(innerValue);
              if (isNaN(number)) {
                  setInnerValue(value?.toString());
                  return;
              }
              onChange(number);
          }
        : undefined;

    return (
        <Input
            type='number'
            className={`${className} w-16`}
            value={innerValue}
            onBlur={handleBlur}
            onChange={setInnerValue}
            {...otherProps}
        />
    );
}

export default NumberInput;
