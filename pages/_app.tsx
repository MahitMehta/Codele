import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
          <title>Codele</title>
          <meta name="description" content="Introducing Wordle For Programmers. Attempt Daily Boolean Statement Guessing Puzzles." />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
