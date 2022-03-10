import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../redux';
import { Provider as ReduxProvider } from 'react-redux';
import { NextSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='h-full'>
      <Head>
          <title>Codle</title>
          <meta name="theme-color" content="#111729" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>
      <NextSeo
            title="Codle"
            description='Introducing Wordle For Programmers. Attempt Daily Boolean Statement Guessing Puzzles.'
            canonical="https://codle.mahitm.com/"
            openGraph={{
              url: "https://codle.mahitm.com/",
              title: "Wordle For Programmers",
              description: "Attempt Today's Boolean Statement Guessing Puzzle.",
              images: [
                {
                  url: "https://res.cloudinary.com/mahitm-cdn/image/upload/v1646936027/codle/puzzle.png",
                  width: 800,
                  height: 600,
                  alt: 'Codle Puzzle',
                  type: 'image/jpeg',
                }
              ],
              site_name: "Codle",
            }}
            twitter={{
              site: 'https://codle.mahitm.com/',
              cardType: 'summary_large_image',
            }}
        />
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
