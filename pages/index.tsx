import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import GameBoard from '../components/GameBoard';
import Navbar from '../components/Navbar';
import ParticlesBG from '../components/Particles';

const Home: NextPage = () => {
  // temp
  useEffect(() => {
    document.querySelector("html")?.classList.add("dark");
  },[]);

  return (
    <div>
      <Head>
        <title>Game | Codele</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div style={{ 
          background: "linear-gradient(180deg, #111729 0%, #2A2A52 36.46%, #774B6B 100%)" 
        }} className='h-96 absolute w-screen bottom-0' />
      <ParticlesBG />
      <main className='flex justify-center h-full items-center'>
          <GameBoard />
      </main>
    </div>
  )
}

export default Home
