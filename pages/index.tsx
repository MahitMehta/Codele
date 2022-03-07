import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import GameBoard from '../components/GameBoard';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import ParticlesBG from '../components/Particles';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Game | Codle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <ParticlesBG />
      {/* <Modal /> */}
      <main style={{ height: "calc(100vh - 100px)"}} className='flex justify-center min-h-[650px] flex-col items-center'>
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
