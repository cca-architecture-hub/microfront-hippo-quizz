import React, {  useEffect, useState } from "react";
import './App.css'
import { subscribeToStats } from "./services/socket";
import { StatsModel } from "./types/StatsModel";
import { Stats } from "./components/Stats";

const initialData = {
  totalQuestions: 0,
  categoryStats: {
    Science: { total: 0, correct: 0 },
    History: { total: 0, correct: 0 },
    Geography: { total: 0, correct: 0 },
    Entertainment: { total: 0, correct: 0 },
    Sports: { total: 0, correct: 0 },
    Technology: { total: 0, correct: 0 },
  },
} as StatsModel;

const App: React.FC = () => {
  const [stats, setStats] = useState<StatsModel>(initialData);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribeToStats((data: any) => {
      setStats(data as StatsModel);
    });
  }, []);

  return (
    <>
      <Stats data={stats}/>
    </>
  )
}

export default App
