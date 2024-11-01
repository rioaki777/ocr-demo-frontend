import clsx from 'clsx';
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'font-medium bg-blue-500 text-white rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      tertiary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg',
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none',
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
    color: 'primary',
  },
});

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  form?: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit' | undefined;
  value?: number | readonly string[] | string;
}

const Button = ({
  children,
  className,
  form,
  color,
  size,
  disabled,
  onClick,
  onSubmit,
  type = 'button',
  value,
}: ButtonProps) => {
  return (
    <button
      className={clsx(button({ color, size, disabled }), className)}
      form={form}
      onClick={onClick}
      onSubmit={onSubmit}
      type={type}
      value={value}
    >
      {children}
    </button>
  );
};

export default Button;
