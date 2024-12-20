import { useEffect, useState } from 'react';
import './App.css'
import { Ranking } from './components/Ranking'
import { subscribeToRank } from "./services/socket";
import { RankModel } from './types/RankModel';



function App() {
  const [rank, setRank] = useState<RankModel | undefined >(undefined);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribeToRank((data: any) => {
      setRank(data as RankModel);
    });
  }, []);
  

  return (
    <>
      <Ranking data={rank}/>
    </>
  )
}

export default App
