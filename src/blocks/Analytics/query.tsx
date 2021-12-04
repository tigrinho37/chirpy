import React from 'react';

import { Link } from '$/components/Link';

import { formatDay, formatMonthYYYY, nowForSite, parseUTCDate } from './date';
import * as storage from './storage';
import { Site } from './type';

const PERIODS = ['realtime', 'day', 'month', '7d', '30d', '6mo', '12mo', 'custom'] as const;

export type Query = {
  period: string;
  date: Date;
  from: Date | undefined;
  to: Date | undefined;
  filters: {
    goal: string | null;
    props: any;
    source: string | null;
    utm_medium: string | null;
    utm_source: string | null;
    utm_campaign: string | null;
    referrer: string | null;
    screen: string | null;
    browser: string | null;
    browser_version: string | null;
    os: string | null;
    os_version: string | null;
    country: string | null;
    region: string | null;
    city: string | null;
    page: string | null;
    entry_page: string | null;
    exit_page: string | null;
  };
};

export function parseQuery(querystring: string, site: Site): Query {
  const q = new URLSearchParams(querystring);
  let period = q.get('period')!;
  const periodKey = `period__${site.domain}`;

  if (PERIODS.includes(period)) {
    if (period !== 'custom' && period !== 'realtime') storage.setItem(periodKey, period);
  } else if (storage.getItem(periodKey)) {
    period = storage.getItem(periodKey);
  } else {
    period = '30d';
  }

  return {
    period,
    date: q.get('date') ? parseUTCDate(q.get('date')) : nowForSite(site),
    from: q.get('from') ? parseUTCDate(q.get('from')) : undefined,
    to: q.get('to') ? parseUTCDate(q.get('to')) : undefined,
    filters: {
      goal: q.get('goal'),
      props: JSON.parse(q.get('props')!),
      source: q.get('source'),
      utm_medium: q.get('utm_medium'),
      utm_source: q.get('utm_source'),
      utm_campaign: q.get('utm_campaign'),
      referrer: q.get('referrer'),
      screen: q.get('screen'),
      browser: q.get('browser'),
      browser_version: q.get('browser_version'),
      os: q.get('os'),
      os_version: q.get('os_version'),
      country: q.get('country'),
      region: q.get('region'),
      city: q.get('city'),
      page: q.get('page'),
      entry_page: q.get('entry_page'),
      exit_page: q.get('exit_page'),
    },
  };
}

export function appliedFilters(query: Query) {
  return Object.keys(query.filters)
    .map((key) => [key, query.filters[key]])
    .filter(([_key, value]) => !!value);
}

function generateHref(data: { [x: string]: string }) {
  const url = new URL(window.location.href);
  Object.keys(data).forEach((key) => {
    if (!data[key]) {
      url.searchParams.delete(key);
      return;
    }

    url.searchParams.set(key, data[key]);
  });
  return url.href;
}

export function navigateToQuery(queryFrom, newData) {
  // if we update any data that we store in localstorage, make sure going back in history will
  // revert them
  if (newData.period && newData.period !== queryFrom.period) {
    const url = new URL(window.location.href);
    url.searchParams.set('period', queryFrom.period);
    window.history.replaceState({}, '', url.href);
  }

  // then push the new query to the history
  window.history.pushState({}, '', generateHref(newData));
}

class QueryLink extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    navigateToQuery(this.props.query, this.props.to);
    this.props.onClick?.(e);
  }

  render() {
    const { to, ...props } = this.props;
    return <Link disabled {...props} href={generateHref(to)} onClick={this.onClick} />;
  }
}

export { QueryLink };

function QueryButton({ query, to, disabled, className, children, onClick }) {
  return (
    <button
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigateToQuery(query, to);
        onClick?.(event);
        window.history.pushState({}, '', generateHref(to));
      }}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

const QueryButtonWithRouter = QueryButton;
export { QueryButtonWithRouter as QueryButton };

export function toHuman(query: Query) {
  if (query.period === 'day') {
    return `on ${formatDay(query.date)}`;
  }
  if (query.period === 'month') {
    return `in ${formatMonthYYYY(query.date)}`;
  }
  if (query.period === '7d') {
    return 'in the last 7 days';
  }
  if (query.period === '30d') {
    return 'in the last 30 days';
  }
  if (query.period === '6mo') {
    return 'in the last 6 months';
  }
  if (query.period === '12mo') {
    return 'in the last 12 months';
  }
  return '';
}

export function eventName(query: Query) {
  if (query.filters.goal) {
    if (query.filters.goal.startsWith('Visit ')) {
      return 'pageviews';
    }
    return 'events';
  }
  return 'pageviews';
}

export const formattedFilters = {
  goal: 'Goal',
  props: 'Goal properties',
  source: 'Source',
  utm_medium: 'UTM Medium',
  utm_source: 'UTM Source',
  utm_campaign: 'UTM Campaign',
  referrer: 'Referrer URL',
  screen: 'Screen size',
  browser: 'Browser',
  browser_version: 'Browser Version',
  os: 'Operating System',
  os_version: 'Operating System Version',
  country: 'Country',
  region: 'Region',
  city: 'City',
  page: 'Page',
  entry_page: 'Entry Page',
  exit_page: 'Exit Page',
};
