import React from "react";
const QuestionsApp = React.lazy(() => import("questionsApp/QuestionsApp"));
const RankingApp = React.lazy(() => import("rankingApp/RankingApp"));
const StatsApp = React.lazy(() => import("statsApp/StatsApp"));

const App = () => (
  <div>
    <h1>Aplicación Principal</h1>
    <React.Suspense fallback={<div>Loading...</div>}>
      <QuestionsApp />
    </React.Suspense>
    <React.Suspense fallback={<div>Loading...</div>}>
      <RankingApp />
    </React.Suspense>
    <React.Suspense fallback={<div>Loading...</div>}>
      <StatsApp />
    </React.Suspense>
  </div>
);

export default App;
