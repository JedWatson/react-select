import * as React from 'react';
import { useMemo } from 'react';
import { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

interface NonceProviderProps {
  nonce: string;
  children: ReactNode;
  cacheKey: string;
}

export default ({ nonce, children, cacheKey }: NonceProviderProps) => {
  const emotionCache = useMemo(
    () => createCache({ key: cacheKey, nonce }),
    [cacheKey, nonce]
  );
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};
