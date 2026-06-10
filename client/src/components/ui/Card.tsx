import { HTMLAttributes } from 'react';

import cn from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card = ({ padding = 'md', className, children, ...rest }: CardProps) => (
  <div
    className={cn(
      'rounded-xl border border-gray-200 bg-white shadow-sm',
      paddingStyles[padding],
      className,
    )}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    {children}
  </div>
);

export default Card;
