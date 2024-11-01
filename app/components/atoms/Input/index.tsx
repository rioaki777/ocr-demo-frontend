import clsx from 'clsx';
import { tv } from 'tailwind-variants';

const input = tv({
  base: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 block w-full p-2.5',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    isError: {
      true: 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 block w-full p-2.5',
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-3 py-1',
    },
  ],
  defaultVariants: {
    size: 'md',
  },
});

export interface InputProps {
  id?: string;
  className?: string;
  accept?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  title?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: number | readonly string[] | string | undefined;
  size?: 'sm' | 'md' | 'lg';
  isError?: boolean;
}

const Input = ({
  id,
  className,
  accept,
  name,
  onChange,
  placeholder,
  title,
  type,
  value,
  size,
  isError,
  ...rest
}: InputProps) => {
  return (
    <input
      id={id}
      accept={accept}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      title={title}
      type={type}
      value={value}
      className={clsx(input({ size, isError }), className)}
      {...rest}
    />
  );
};

export default Input;
