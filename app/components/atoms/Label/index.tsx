import clsx from 'clsx';
import { tv } from 'tailwind-variants';

const label = tv({
  base: 'flex w-fit items-center gap-2 text-solid-grey-800',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg',
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

export interface LabelProps {
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  htmlFor?: string;
}

export const Label = ({
  children,
  className,
  size,
  htmlFor,
  ...rest
}: LabelProps) => {
  return (
    <label
      className={clsx(label({ size }), className)}
      htmlFor={htmlFor}
      {...rest}
    >
      {children}
    </label>
  );
};
export default Label;
