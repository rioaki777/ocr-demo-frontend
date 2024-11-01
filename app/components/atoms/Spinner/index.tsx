import clsx from 'clsx';
import { tv } from 'tailwind-variants';

const spinner = tv({
  base: 'animate-spin rounded-full border-current border-e-transparent',
  variants: {
    size: {
      sm: 'h-4 w-4 border-2',
      md: 'h-10 w-10 border-4',
      lg: 'h-20 w-20 border-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface SpinnerProps {
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner = ({
  className,
  children,
  size,
  ...rest
}: SpinnerProps) => {
  return (
    <div className={clsx(spinner({ size }), className)} {...rest}>
      {children}
    </div>
  );
};
export default Spinner;
