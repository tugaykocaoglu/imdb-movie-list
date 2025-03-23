'use client';

import '../styles/globals.scss';

import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <>
        <h1 className='title'>
          <Link href={'/'}>MOVIE LIST</Link>
        </h1>
        <div className='full-container'>
          <div className='component-container'>
            <Component {...pageProps} />
          </div>
        </div>
      </>
    </Provider>
  );
}

export default MyApp;
