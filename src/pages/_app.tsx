import { useRouter } from 'next/router';
import '../styles/globals.scss';
import { useState } from 'react';

import { Provider } from 'react-redux';
import { store } from '@/store';
import Link from 'next/link';

function MyApp({ Component, pageProps }: any) {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  return (
    <Provider store={store}>
      <>
        <h1 className='title'>
          <Link href={'/'}>MOVIE LIST</Link>
        </h1>
        <div
          style={{
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minHeight: '100vh',
            background: 'rgba(0,0,0,0.045)',
          }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div
              style={{
                display: 'flex',
                minHeight: '100vh',
                width: '100vw',
                maxWidth: '1400px',
                padding: '16px',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <Component {...pageProps} />
            </div>
          )}
        </div>
      </>
    </Provider>
  );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await NextApp.getInitialProps(appContext);
//   let posts = [];

//   try {
//     // Axios ile API isteği gönderme
//     const response = await axios.get(
//       'https://jsonplaceholder.typicode.com/posts'
//     );
//     const data = response.data;

//     store.dispatch(setPosts(data));

//     posts = data;
//   } catch (error) {
//     console.error('API isteği sırasında hata:', error.message);
//   }

//   return { ...appProps, posts };
// };

export default MyApp;
