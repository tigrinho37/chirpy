import clsx from 'clsx';
import * as React from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = React.PropsWithChildren<
  {
    size?: Size;
    className?: string;
  } & React.ComponentProps<'img'>
>;

const sizeStyles: Record<Size, string> = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export function Avatar({
  size = 'md',
  className = '',
  alt = '',
  children,
  ...imgProps
}: AvatarProps): JSX.Element {
  return (
    <img
      {...imgProps}
      alt={alt}
      className={clsx(
        `flex items-center justify-center rounded-full bg-gray-50 select-none ring-4 ring-white`,
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </img>
  );
}
