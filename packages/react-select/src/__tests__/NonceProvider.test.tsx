import React from 'react';
import { render, screen } from '@testing-library/react';
import NonceProvider from '../NonceProvider';
import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/cache';

jest.mock('@emotion/cache', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@emotion/react', () => {
  const actualReact = jest.requireActual<typeof import('react')>('react');
  return {
    __esModule: true,
    CacheProvider: ({
      children,
      value,
    }: {
      children: import('react').ReactNode;
      value: any;
    }) =>
      actualReact.createElement(
        'div',
        {
          'data-testid': 'cache-provider',
          'data-cache-key': value?.key,
          'data-cache-nonce': value?.nonce,
          'data-cache-id': value?.id,
        },
        children
      ),
  };
});

describe('NonceProvider', () => {
  let createCacheMock: jest.MockedFunction<typeof createCache>;
  let cacheId: number;

  const createFakeCache = (
    key: string,
    nonce?: string
  ): EmotionCache & { id: number } =>
    ({
      key,
      nonce,
      inserted: {},
      registered: {},
      sheet: {
        key,
        nonce,
        container: document.head,
        tags: [],
        insert: () => {},
        flush: () => {},
      },
      insert: () => '',
      id: ++cacheId,
    } as unknown as EmotionCache & { id: number });

  beforeEach(() => {
    createCacheMock = createCache as jest.MockedFunction<typeof createCache>;
    cacheId = 0;
    createCacheMock.mockImplementation(({ key, nonce }) =>
      createFakeCache(key, nonce)
    );
    jest.clearAllMocks();
  });

  it('creates an Emotion cache with the provided nonce and cacheKey and renders children', () => {
    render(
      <NonceProvider nonce="abc123" cacheKey="css">
        <div data-testid="child">Child content</div>
      </NonceProvider>
    );

    expect(createCacheMock).toHaveBeenCalledWith({
      key: 'css',
      nonce: 'abc123',
    });
    expect(screen.getByTestId('cache-provider')).toHaveAttribute(
      'data-cache-key',
      'css'
    );
    expect(screen.getByTestId('cache-provider')).toHaveAttribute(
      'data-cache-nonce',
      'abc123'
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('memoizes the cache when nonce and cacheKey remain stable', () => {
    const { rerender } = render(
      <NonceProvider nonce="abc123" cacheKey="css">
        <div />
      </NonceProvider>
    );

    expect(createCacheMock).toHaveBeenCalledTimes(1);
    const initialId = screen
      .getByTestId('cache-provider')
      .getAttribute('data-cache-id');

    rerender(
      <NonceProvider nonce="abc123" cacheKey="css">
        <div />
      </NonceProvider>
    );

    expect(createCacheMock).toHaveBeenCalledTimes(1);
    const rerenderId = screen
      .getByTestId('cache-provider')
      .getAttribute('data-cache-id');
    expect(rerenderId).toBe(initialId);
  });

  it('recreates the cache when cacheKey or nonce changes', () => {
    const { rerender } = render(
      <NonceProvider nonce="abc123" cacheKey="css">
        <div />
      </NonceProvider>
    );

    expect(createCacheMock).toHaveBeenCalledTimes(1);
    const initialId = screen
      .getByTestId('cache-provider')
      .getAttribute('data-cache-id');

    rerender(
      <NonceProvider nonce="abc123" cacheKey="css-2">
        <div />
      </NonceProvider>
    );

    expect(createCacheMock).toHaveBeenCalledTimes(2);
    const cacheKeyChangeId = screen
      .getByTestId('cache-provider')
      .getAttribute('data-cache-id');
    expect(cacheKeyChangeId).not.toBe(initialId);

    rerender(
      <NonceProvider nonce="def456" cacheKey="css-2">
        <div />
      </NonceProvider>
    );

    expect(createCacheMock).toHaveBeenCalledTimes(3);
    const nonceChangeId = screen
      .getByTestId('cache-provider')
      .getAttribute('data-cache-id');
    expect(nonceChangeId).not.toBe(cacheKeyChangeId);
  });
});
