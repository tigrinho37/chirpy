import * as React from 'react';
import 'twin.macro';

import { Button, ButtonProps } from '$/components/Button';
import { Divider } from '$/components/Divider';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { List, ListItem } from '$/components/List';
import { Text } from '$/components/Text';

export type PricingProps = React.PropsWithChildren<{
  id?: string;
}>;

export function Pricing({ id }: PricingProps): JSX.Element {
  return (
    <div id={id} tw="py-8 flex flex-col items-center">
      <Heading as="h2" tw="mb-4">
        Pricing Plans
      </Heading>
      <Text tw="mb-8 mx-6" variant="secondary" size="lg">
        Start building for free, then add a site to go live. Account plans unblock additional
        features.
      </Text>
      <div tw="flex flex-col space-y-3 md:(flex-row space-x-6 space-y-0)">
        <PricingCard
          plan="Hobby"
          price="0"
          callToAction={{
            label: 'Try It Free',
          }}
          benefits={[
            '1 Website',
            'Privacy-first, No Ads',
            'Basic rich text formatting',
            // 'Markdown support',
            'Third party sign in',
            'Basic analytics',
          ]}
        />
        <PricingCard
          plan="Pro"
          price="0"
          benefits={[
            <span key="website">
              <span tw="font-bold text-gray-1200">10</span> Websites
            </span>,
            'Privacy-first, No Ads',
            'Basic rich text formatting',
            // 'Markdown support',
            'Third party sign in',
            'Basic analytics',
            'Text formatting with image',
            'Widget customization',
            'No branding',
          ]}
          callToAction={{
            // label: 'Buy Pro',
            label: 'Try It Free',
            buttonProps: {
              color: 'primary',
            },
          }}
          priceDescription="Free for now"
        />
      </div>
    </div>
  );
}

type PricingCardProps = {
  plan: string;
  price: string;
  callToAction: {
    label: string;
    buttonProps?: Partial<ButtonProps>;
  };
  priceDescription?: string;
  benefits?: React.ReactNode[];
};

function PricingCard({
  plan,
  price,
  benefits,
  callToAction,
  priceDescription,
}: PricingCardProps): JSX.Element {
  return (
    <div tw="bg-gray-100 border p-6 rounded shadow hover:shadow-xl transition">
      <Heading as="h5" tw="font-medium mb-4">
        {plan}
      </Heading>
      <Text tw="mb-8" variant="secondary">
        All the basics for starting a new community
      </Text>
      <Text tw="text-3xl mb-2">
        <span tw="font-bold">${price}</span>
        <Text as="span" variant="secondary" size="base">
          /mo
        </Text>
      </Text>
      <Text tw="mb-8" variant="secondary">
        {priceDescription}&#8203;
      </Text>
      <Link variant="plain" href="/auth/sign-in">
        <Button {...callToAction.buttonProps} variant="solid" tw="w-full mb-8">
          {callToAction.label}
        </Button>
      </Link>
      <Divider tw="-mx-6 max-w-none mb-8" />
      <Text bold tw="mb-3" variant="secondary">{`WHAT'S INCLUDED`}</Text>
      <List tw="space-y-2">
        {benefits?.map((benefit, index) => (
          <ListItem key={index}>{benefit}</ListItem>
        ))}
      </List>
    </div>
  );
}
