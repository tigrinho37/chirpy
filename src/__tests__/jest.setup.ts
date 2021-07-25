import '@testing-library/jest-dom';
import DotEnv from 'dotenv';
import 'whatwg-fetch';

import { server } from './fixtures/server/server';
import { cleanEvents } from './mocks/nextRouter';

DotEnv.config({
  path: '.env.test',
});

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => {
  cleanEvents();
  server.close();
});

// eslint-disable-next-line unicorn/consistent-function-scoping
jest.mock('next/dynamic', () => (func: () => Promise<any>) => {
  let component: any = null;
  func().then((module: any) => {
    component = module.default;
  });
  const DynamicComponent = (...args: any[]) => component(...args);
  DynamicComponent.displayName = 'LoadableComponent';
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});
