import { useRouter } from 'next/router';
import '../styles/globals.scss';
import { useState } from 'react';

import { Provider } from 'react-redux';
import { store } from '@/store';
import Link from 'next/link';

function MyApp({ Component, pageProps }: any) {
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
