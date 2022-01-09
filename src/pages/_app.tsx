import { Global } from '@emotion/react';
import { LazyMotion } from 'framer-motion';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import 'tailwindcss/tailwind.css';
import { GlobalStyles } from 'twin.macro';

import { ErrorFallback } from '$/blocks/ErrorFallback';
import { Spinner } from '$/components/Spinner';
import { ToastProvider } from '$/components/Toast';
import { CurrentUserProvider } from '$/contexts/CurrentUserProvider';
import { GQLClientProvider } from '$/contexts/GQLClientProvider';
import { useIsUnmounting } from '$/hooks/useIsUnmounting';
import { ANALYTICS_DOMAIN, APP_NAME_LOWERCASE, HASURA_TOKEN_MAX_AGE } from '$/lib/constants';
import { appGlobalStyles } from '$/styles/global-styles';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element {
  const handleError = React.useCallback((error: Error, info: { componentStack: string }) => {
    console.log({ error, info });
  }, []);
  const AuthWrapper = (Component as any).auth ? AuthGuard : React.Fragment;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <PlausibleProvider domain={ANALYTICS_DOMAIN}>
        <SessionProvider
          session={session}
          // Refresh hasura token before it expires
          refetchInterval={HASURA_TOKEN_MAX_AGE - 5 * 60}
        >
          {/* Tailwindcss global styles */}
          <GlobalStyles />
          <Global styles={appGlobalStyles} />

          <NextThemesProvider attribute="class" storageKey={`${APP_NAME_LOWERCASE}.theme`}>
            <LazyMotion features={loadFeatures} strict>
              <SessionGuard>
                <GQLClientProvider>
                  <CurrentUserProvider>
                    <ToastProvider>
                      <AuthWrapper>
                        <Component {...pageProps} />
                      </AuthWrapper>
                    </ToastProvider>
                  </CurrentUserProvider>
                </GQLClientProvider>
              </SessionGuard>
            </LazyMotion>
          </NextThemesProvider>
        </SessionProvider>
      </PlausibleProvider>
    </ErrorBoundary>
  );
}

export default App;

function SessionGuard({ children }: { children: React.ReactNode }): JSX.Element {
  const { status } = useSession();
  const loading = status === 'loading';
  const isMounted = useIsUnmounting();

  if (loading && !isMounted) {
    return <Spinner tw="mt-32 justify-center" />;
  }
  return <>{children}</>;
}

function AuthGuard({ children }: { children: React.ReactNode }): JSX.Element {
  const { status } = useSession();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  return <>{children}</>;
}

const loadFeatures = () => import('../utilities/framer-motion-features').then((res) => res.default);
