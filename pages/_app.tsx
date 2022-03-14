import React, { useEffect, useMemo } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor, wrapper } from '../redux';
import { Provider as ReduxProvider } from 'react-redux';
import { NextSeo } from 'next-seo';
import ReactGA from 'react-ga';

const DEBUG = process.env.NODE_ENV === "development"; 

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ReactGA.initialize("UA-169861222-2", { 
      gaOptions: {
        siteSpeedSampleRate: 100,
      },
      debug: DEBUG,
      titleCase: false,
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return  (
    <div className='h-full'>
      <Head>
          <title>Codle</title>
          <meta name="theme-color" content="#111729" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo.png" />
      </Head>
      <NextSeo
            key={"root"}
            title="Codle"
            additionalMetaTags={[
              {
                name: "keywords",
                content: "wordle, codle, game, word, crossword"
              }
            ]}
            description='Introducing Wordle For Programmers. Attempt Daily Boolean Statement Guessing Puzzles.'
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

export default wrapper.withRedux(MyApp);
