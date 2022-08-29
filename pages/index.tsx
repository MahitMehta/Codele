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
import { IRootReducer } from '../redux/reducers';
import { getPuzzlePattern, getPuzzleTimestamp } from '../redux/selectors/board';
import { setPuzzleAttempts, setPuzzleIdentifers, setPuzzleStatus } from '../redux/actions/board';
import Snackbar from '../components/Snackbar';
import { EPuzzleStatus } from '../redux/enums/puzzleStatus';
import { EGameType } from '../redux/enums/gameType';
import { GameTypeContext } from '../common/context/gameTypeContext';
import { decodeSequence } from '../utils/puzzle/decode';
import clsx from 'clsx';
import Link from 'next/link';

interface IStaticProps {
  sequence: string[];
  timestamp?: string;
}

const Home: NextPage<IStaticProps> = ({ sequence, timestamp }) => {
  const dispatch = useDispatch();
  const state = useSelector((state:IRootReducer) => state);

  const puzzlePattern = getPuzzlePattern(state);
  const puzzleTimestamp = getPuzzleTimestamp(state);

  const decodedSequence = useMemo(() => decodeSequence(sequence), [ sequence ]);

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
          dispatch(setPuzzleStatus(EPuzzleStatus.IN_PROGRESS, EGameType.DAILY));
          dispatch(setPuzzleAttempts([], EGameType.DAILY));
      } else if (sequence.join("") !== puzzlePattern || puzzleTimestamp != timestamp) {
          dispatch(setPuzzleIdentifers({ 
            puzzlePattern: sequence.join(""), 
            puzzleTimestamp: timestamp 
          }));
          dispatch(setPuzzleStatus(EPuzzleStatus.IN_PROGRESS, EGameType.DAILY));
          dispatch(setPuzzleAttempts([], EGameType.DAILY));
      }
  }, []);

  return (
    <GameTypeContext.Provider value={{ type: EGameType.DAILY }}>
      <div className='h-full dark:bg-slate-900'> 
        <Head key="index">
          <title>Game | Codle</title>
          <link rel="canonical" href="https://codle.mahitm.com/"/>
        </Head>
        <ParticlesBG />
        <Snackbar />
        <Navbar />
        <main style={{ height: "calc(100% - var(--navbar-height))"}} className='flex min-h-[575px] md:min-h-[675px] flex-col items-center'>
            <Link href="/unlimited">
              <div 
                className={clsx(
                    "pt-5 z-10 flex space-x-2 hover:opacity-75 transition-opacity"
                )}
                role="button"> 
                    <p className="text-white font-medium">
                        Play Codle <u>Unlimited</u>!
                    </p>
              </div>
            </Link>
            <GameBoard />
            <Keyboard />
            <div style={{ 
            background: "linear-gradient(180deg, #111729 0%, #2A2A52 36.46%, #774B6B 100%)" 
          }} className='h-96 fixed w-screen bottom-0' />
        </main>
      </div>
    </GameTypeContext.Provider>
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