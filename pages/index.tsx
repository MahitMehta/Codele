import type { NextPage } from 'next'
import Head from 'next/head'
import { useLayoutEffect, useState } from 'react';
import GameBoard from '../components/GameBoard';
import Keyboard from '../components/Keyboard';
import Navbar from '../components/Navbar';
import ParticlesBG from '../components/Particles';
import useDimensions from '../hooks/useDimensions';

const Home: NextPage = () => {
  const { height } = useDimensions({ enableDebounce: true, debounceWait: 100 });

  return (
    <div>
      <Head>
        <title>Game | Codle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParticlesBG />
      <Navbar />
      <main style={{ height: height - 100 }} className='flex justify-center min-h-[575px] md:min-h-[675px] flex-col items-center'>
          <GameBoard />
          <Keyboard />
          <div style={{ 
          background: "linear-gradient(180deg, #111729 0%, #2A2A52 36.46%, #774B6B 100%)" 
        }} className='h-96 fixed w-screen bottom-0 -z-[1]' />
      </main>
    </div>
  )
}

export default Home
