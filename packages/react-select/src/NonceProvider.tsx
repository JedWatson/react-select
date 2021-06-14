import React, { Component, ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import memoizeOne from 'memoize-one';

interface NonceProviderProps {
  nonce: string;
  children: ReactNode;
  cacheKey: string;
}

export default class NonceProvider extends Component<NonceProviderProps> {
  constructor(props: NonceProviderProps) {
    super(props);
    this.createEmotionCache = memoizeOne(this.createEmotionCache);
  }
  createEmotionCache = (nonce: string, key: string) => {
    return createCache({ nonce, key });
  };
  render() {
    const emotionCache = this.createEmotionCache(
      this.props.nonce,
      this.props.cacheKey
    );
    return (
      <CacheProvider value={emotionCache}>{this.props.children}</CacheProvider>
    );
  }
}
