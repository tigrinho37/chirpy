import { Global } from '@emotion/react';
import { useRouter } from 'next/router';
import React from 'react';

import Datepicker from './datepicker';
import Filters from './filters';
import { parseQuery } from './query';
import Conversions from './stats/conversions';
import Devices from './stats/devices';
import Locations from './stats/locations';
import Pages from './stats/pages';
import Sources from './stats/sources';
import VisitorGraph from './stats/visitor-graph';
import { analyticsStyles } from './styles';
import { Site } from './type';

export interface RealtimeProps {
  stuck: boolean;
  site: Site;
  loggedIn: boolean;
  currentUserRole: 'owner' | 'admin' | 'public';
}

export default function Realtime(props: RealtimeProps) {
  const [query, setQuery] = React.useState(() => parseQuery(window.location.search, props.site));
  const router = useRouter();

  React.useEffect(() => {
    setQuery(parseQuery(location.search, props.site));
  }, [router.asPath, props.site]);
  const [timer, setTimer] = React.useState(() => new Timer());
  const navClass = props.site.embedded ? 'relative' : 'sticky';
  const renderConversions = () => {
    if (props.site.hasGoals) {
      return (
        <div className="items-start justify-between block w-full mt-6 md:flex">
          <Conversions site={props.site} query={query} title="Goal Conversions (last 30 min)" />
        </div>
      );
    }

    return null;
  };
  return (
    <>
      <Global styles={analyticsStyles} />
      <div className="mb-12">
        <div id="stats-container-top"></div>
        <div
          className={`${navClass} top-0 sm:py-3 py-2 z-10 ${
            props.stuck && !props.site.embedded
              ? 'fullwidth-shadow bg-gray-50 dark:bg-gray-850'
              : ''
          }`}
        >
          <div className="items-center w-full flex">
            <div className="flex items-center w-full">
              {/* <SiteSwitcher
          site={this.props.site}
          loggedIn={this.props.loggedIn}
          currentUserRole={this.props.currentUserRole}
        /> */}
              <Filters className="flex" site={props.site} query={query} history={window.history} />
            </div>
            <Datepicker site={props.site} query={query} />
          </div>
        </div>
        <VisitorGraph site={props.site} query={query} timer={timer} />
        <div className="items-start justify-between block w-full md:flex">
          <Sources site={props.site} query={query} timer={timer} />
          <Pages site={props.site} query={query} timer={timer} />
        </div>
        <div className="items-start justify-between block w-full md:flex">
          <Locations site={props.site} query={query} timer={timer} />
          <Devices site={props.site} query={query} timer={timer} />
        </div>

        {renderConversions()}
      </div>
    </>
  );
}

const THIRTY_SECONDS = 30_000;

class Timer {
  listeners: Array<() => void>;
  intervalId: number;

  constructor() {
    this.listeners = [];
    this.intervalId = window.setInterval(this.dispatchTick.bind(this), THIRTY_SECONDS);
  }

  onTick(listener: () => void) {
    this.listeners.push(listener);
  }

  dispatchTick() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}
