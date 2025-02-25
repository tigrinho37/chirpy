import clsx from 'clsx';
import md5 from 'md5';
import * as React from 'react';

import { IconUser } from '../icons';
import { DeferredCustomAvatar } from './custom-avatar';

type Size = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = Omit<React.ComponentProps<'img'>, 'src' | 'alt'> &
  React.PropsWithChildren<{
    src: string | null | undefined;
    email: string | null | undefined;
    name: string | null | undefined;
    username: string | null | undefined;
    alt: string | null | undefined;
    size?: Size;
  }>;

const sizeStyles: Record<Size, [string, number]> = {
  sm: [`w-4 h-4`, 20],
  md: [`w-8 h-8`, 32],
  lg: [`w-12 h-12`, 48],
  xl: [`w-16 h-16`, 64],
};

export function Avatar({
  size = 'md',
  className,
  alt,
  children,
  src,
  email,
  name,
  username,
  ...imgProps
}: AvatarProps): JSX.Element {
  alt ||= 'Default avatar';
  const [sizeStyle, iconSize] = sizeStyles[size];
  const [gravatarUrl, setGravatarUrl] = React.useState('');

  React.useEffect(() => {
    if (email && !src) {
      const img = new Image();
      const url = `https://www.gravatar.com/avatar/${md5(
        email.toLowerCase().trim(),
      )}?s=${iconSize}&d=404`;
      img.src = url;
      img.addEventListener('load', () => setGravatarUrl(url));
      // img.onerror = () => {};
    }
  }, [email, src, iconSize]);

  if (!src) {
    const placeholder = (
      <IconUser
        size={iconSize * 0.75}
        className={clsx('m-1 rounded-full', ring, className)}
        aria-label={alt}
      />
    );

    if (gravatarUrl) {
      return (
        <img
          src={gravatarUrl}
          alt={alt}
          className={clsx(
            bg,
            ring,
            `flex select-none items-center justify-center rounded-full`,
            sizeStyle,
            className,
          )}
          {...imgProps}
        />
      );
    }

    // Keep this order to reduce name collision
    const customAvatarValue = username || email || name;
    if (customAvatarValue) {
      return (
        <DeferredCustomAvatar
          value={customAvatarValue}
          fallback={placeholder}
          size={iconSize}
          border
          className={clsx(className)}
        />
      );
    }
    return placeholder;
  }

  return (
    <img
      {...imgProps}
      src={src}
      alt={alt}
      className={clsx(
        bg,
        ring,
        `flex select-none items-center justify-center rounded-full`,
        sizeStyle,
        className,
      )}
      suppressHydrationWarning
    >
      {children}
    </img>
  );
}

const bg = `bg-grayl-100/60 dark:bg-grayd-100/30`;
const ring = `ring ring-white`;
