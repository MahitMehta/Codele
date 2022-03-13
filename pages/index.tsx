import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameBoard from '../components/GameBoard';
import Keyboard from '../components/Keyboard';
import Navbar from '../components/Navbar';
import ParticlesBG from '../components/Particles';
import { setPuzzleSequence } from '../redux/actions/tempBoard';
import { getPuzzleHandler } from "./api/puzzle";
import { puzzleSymbolMap, EPuzzleSymbols  } from "../utils/maps/puzzle";
import { IRootReducer } from '../redux/reducers';
import { getPuzzlePattern, getPuzzleTimestamp } from '../redux/selectors/board';
import { setPuzzleAttempts, setPuzzleIdentifers } from '../redux/actions/board';
import Snackbar from '../components/Snackbar';

interface IStaticProps {
  sequence: string[];
  timestamp?: string;
}

const Home: NextPage<IStaticProps> = ({ sequence, timestamp }) => {
  const dispatch = useDispatch();
  const state = useSelector((state:IRootReducer) => state);

  const puzzlePattern = getPuzzlePattern(state);
  const puzzleTimestamp = getPuzzleTimestamp(state);

  const decodedSequence = useMemo(() => {
    return sequence.map(symbol => {
      const decoded = Buffer.from(symbol, "base64").toString("utf8"); 
      return puzzleSymbolMap[decoded as EPuzzleSymbols];
    });
  }, [ sequence ]);

  useEffect(() => {
      dispatch(setPuzzleSequence(decodedSequence));
  }, [ decodedSequence, timestamp ]); 

  useEffect(() => { 
      if (!sequence.length || !timestamp) return; 
      
      if (!puzzlePattern || !puzzleTimestamp) {
          dispatch(setPuzzleIdentifers({ 
            puzzlePattern: sequence.join(""), 
            puzzleTimestamp: timestamp 
          }));
          dispatch(setPuzzleAttempts([]));
      } else if (sequence.join("") !== puzzlePattern || puzzleTimestamp != timestamp) {
          dispatch(setPuzzleIdentifers({ 
            puzzlePattern: sequence.join(""), 
            puzzleTimestamp: timestamp 
          }));
          dispatch(setPuzzleAttempts([]));
      }
  }, []);

  return (
    <div className='h-full'>
      <Head key="index">
        <title>Game | Codle</title>
        <link rel="canonical" href="https://codle.mahitm.com/"/>
      </Head>
      <ParticlesBG />
      <Snackbar />
      <Navbar />
      <main style={{ height: "calc(100% - var(--navbar-height))"}} className='flex justify-center min-h-[575px] md:min-h-[675px] flex-col items-center'>
          <GameBoard />
          <Keyboard />
          <div style={{ 
          background: "linear-gradient(180deg, #111729 0%, #2A2A52 36.46%, #774B6B 100%)" 
        }} className='h-96 fixed w-screen bottom-0 -z-[1]' />
      </main>
    </div>
  )
}


export async function getStaticProps() {
  const { sequence = [], timestamp } = await getPuzzleHandler();
  return {
    props: { 
      sequence: sequence.map((symbol) => Buffer.from(symbol).toString("base64")),
      timestamp
    },
    // - At most once every 1 minutes
    revalidate: 60, // In seconds
  }
}

export default Home; 