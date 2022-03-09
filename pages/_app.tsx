import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../redux';
import { Provider as ReduxProvider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='h-full'>
      <Head>
          <title>Codle</title>
          <meta name="description" content="Introducing Wordle For Programmers. Attempt Daily Boolean Statement Guessing Puzzles." />
      </Head>
      <React.StrictMode>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              {
                () => (
                  <Component {...pageProps} />
                )
              }
            </PersistGate>
        </ReduxProvider>
      </React.StrictMode>
    </div>
  )
}

export default MyApp
