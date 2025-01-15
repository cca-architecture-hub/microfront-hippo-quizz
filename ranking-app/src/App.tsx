import { useEffect, useState } from 'react';
import './App.css'
import { Ranking } from './components/Ranking'
import { subscribeToRank } from "./services/socket";
import { RankModel } from './types/RankModel';


type User = {
  id: string;
};

const App: React.FC = () => {
  const [rank, setRank] = useState<RankModel | undefined >(undefined);
  const [user, setUser] = useState<string | undefined>(undefined);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribeToRank((data: any) => {
      setRank(data as RankModel);
    });
  }, []);

  useEffect(() => {
    const handleSetUser = (event: CustomEvent<User>) => {
      setUser(event.detail.id);
    };
    document.addEventListener('ADD_USER', handleSetUser as EventListener);
  
    return () => {
      document.removeEventListener('ADD_USER', handleSetUser as EventListener);
    }
}, []);

  

  return (
    <>
      <Ranking data={rank} player={user}/>
    </>
  )
}

export default App
