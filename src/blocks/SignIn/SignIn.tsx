import { signIn } from 'next-auth/client';
import Head from 'next/head';
import * as React from 'react';
import tw, { css } from 'twin.macro';

import { Alert } from '$/components/Alert';
import { Button } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { Text } from '$/components/Text';
import { SIGN_IN_ERRORS } from '$/strings';

import { authOptions } from './DataSource';

export type SignInProps = React.PropsWithChildren<{
  title: string;
  subtitle?: React.ReactNode;
}>;

type SignInErrorKeys = keyof typeof SIGN_IN_ERRORS;

export function SignIn({ title, subtitle }: SignInProps): JSX.Element {
  const [errorType, setErrorType] = React.useState<SignInErrorKeys | undefined>();
  React.useEffect(() => {
    const error = new URLSearchParams(location.search).get('error') as SignInErrorKeys | null;
    if (error) {
      setErrorType(error);
    }
  }, []);
  const error = errorType && (SIGN_IN_ERRORS[errorType] ?? SIGN_IN_ERRORS.Default);
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div tw="flex flex-row h-full">
        <div tw="flex-1 flex flex-col justify-center items-center">
          <div tw="py-7 mx-20 w-full md:w-96">
            <div tw="space-y-2">
              <Heading as="h2" tw="font-black mt-5">
                {title}
              </Heading>
              {subtitle}
            </div>
            <div tw="space-y-2 mt-8">
              {error && <Alert type="warn">{error}</Alert>}
              {authOptions.map((option) => (
                <Button
                  key={option.name}
                  onClick={() =>
                    signIn(option.name.toLowerCase(), {
                      callbackUrl: `${location.origin}/auth/redirecting`,
                    })
                  }
                  tw="w-full"
                  size="lg"
                >
                  <option.icon />
                  <span tw="inline-block ml-2 text-left" style={{ width: '12.5rem' }}>
                    Sign in with {option.name}
                  </span>
                </Button>
              ))}
            </div>
            <Text tw="py-3" size="sm" variant="secondary">
              By clicking the buttons above, you acknowledge that you have read and understood, and
              agree to {process.env.NEXT_PUBLIC_APP_NAME}
              {`'s `}
              <Link href="/terms-of-service">Terms of Service</Link> and{' '}
              <Link href="/privacy-policy">Privacy Policy</Link>.
            </Text>
          </div>
        </div>
        <div css={[tw`flex-1 hidden md:block`, bannerStyle]}></div>
      </div>
    </>
  );
}

const bannerStyle = css`
  width: 100%;
  height: 100vh;
  min-height: 200px;
  background: url('/images/sign-in/banner.jpg') center no-repeat;
  background-size: cover;
`;
