import React from "react";
import ErrorBoundary from "./utils/ErrorBoundary";
import { Separator } from "@/components/ui/separator";
import { Join } from "./components/Join/Join";
import { joinUser } from "./services/api";
import useUserStore, { UserStore } from './store';

const QuestionsApp = React.lazy(() => import("questionsApp/QuestionsApp"));
const RankingApp = React.lazy(() => import("rankingApp/RankingApp"));
const StatsApp = React.lazy(() => import("statsApp/StatsApp"));

const App = () => {
  const setUser = useUserStore((state: UserStore) => state.setUser);

  const handleJoin = (name: string) => {
    joinUser(name)
      .then((res) => {
        console.log('Respuesta del servidor:', res);
        setUser({id: res.id, name: name});
      })
      .catch((error) => {
        console.error('Error al unirse:', error);
      });
  };

  return (
    <>
      <div className="header">
        <h1>CapQuizmini</h1>
        <Join onJoin={handleJoin} />
      </div>
      <Separator />
      <div className="containerM">
        <React.Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <StatsApp />
          </ErrorBoundary>
        </React.Suspense>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <QuestionsApp />
          </ErrorBoundary>
        </React.Suspense>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <RankingApp />
          </ErrorBoundary>
        </React.Suspense>
      </div>
      <Separator />
    </>
  );
};

export default App;
