import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { Heading } from '$/components/Heading';
import { APP_NAME } from '$/lib/constants';
import { ssrMode } from '$/utilities/env';

function DeletionConfirmation(): JSX.Element {
  return (
    <>
      <Head>
        <title>Deletion confirmation - {APP_NAME}</title>
      </Head>
      <div tw="space-y-8">
        <Heading as="h1">
          Thanks, you facebook account was already deleted. Status code{' '}
          {!ssrMode ? new URLSearchParams(location.search).get('code') : ''}
        </Heading>
      </div>
    </>
  );
}

export default DeletionConfirmation;
