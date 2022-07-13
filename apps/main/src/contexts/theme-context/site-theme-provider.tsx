import Head from 'next/head';
import * as React from 'react';

import { useThemeVariables } from './use-theme-variables';

export type SiteThemeProviderProps = {
  children: React.ReactNode;
};

export function SiteThemeProvider(props: SiteThemeProviderProps): JSX.Element {
  const { styles } = useThemeVariables();
  React.useEffect(() => {
    // Add site specific global styles
    document.body.classList.add('site');
  }, []);

  return (
    <>
      <Head>
        <style key="site-theme">{styles}</style>
      </Head>
      {props.children}
    </>
  );
}
