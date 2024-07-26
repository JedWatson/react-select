import * as React from 'react';
import { useMemo } from 'react';
import { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

interface NonceProviderProps {
  nonce: string;
  children: ReactNode;
  cacheKey: string;
  container?: Node;
}

export default ({
  nonce,
  children,
  cacheKey,
  container,
}: NonceProviderProps) => {
  const emotionCache = useMemo(
    () => createCache({ key: cacheKey, nonce, container }),
    [cacheKey, nonce, container]
  );
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};
