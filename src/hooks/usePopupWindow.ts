import * as React from 'react';

import { LOG_IN_SUCCESS_KEY } from '$/lib/constants';

import { useStorageListener } from './useStorageListener';

export type usePopupWindowOptions = {
  url: string;
  width?: number;
  height?: number;
};

export function usePopupWindow({
  url,
  width = 480,
  height = 760,
}: usePopupWindowOptions): () => void {
  const popupWindow = React.useRef<Window | null>(null);
  const handleClickSignIn = () => {
    popupWindow.current = popupCenterWindow(url, '_blank', width, height);
  };

  useStorageListener((event) => {
    if (event.key === LOG_IN_SUCCESS_KEY) {
      popupWindow.current?.close();
      popupWindow.current = null;
    }
  });

  return handleClickSignIn;
}

function popupCenterWindow(
  url: string,
  title: string,
  width: number,
  height: number,
): Window | null {
  const { userAgent } = navigator;
  const isMobile =
    /\b(iPhone|iP[ao]d)/.test(userAgent) ||
    /\b(iP[ao]d)/.test(userAgent) ||
    /android/i.test(userAgent) ||
    /mobile/i.test(userAgent);
  const screenX = window.screenX || window.screenLeft;
  const screenY = window.screenY || window.screenTop;
  const outerWidth = window.outerWidth || document.documentElement.clientWidth;
  const outerHeight = window.outerHeight || document.documentElement.clientHeight - 22;
  const targetWidth = isMobile ? 0 : width;
  const targetHeight = isMobile ? 0 : height;
  const V = screenX < 0 ? window.screen.width + screenX : screenX;
  const left = V + (outerWidth - targetWidth) / 2;
  const right = screenY + (outerHeight - targetHeight) / 2.5;
  const features = [];
  if (targetWidth !== 0) {
    features.push('width=' + targetWidth);
  }
  if (targetHeight !== 0) {
    features.push('height=' + targetHeight);
  }
  features.push('left=' + left, 'top=' + right, 'scrollbars=1');

  const newWindow = window.open(url, title, features.join(','));
  newWindow?.focus();

  return newWindow;
}
