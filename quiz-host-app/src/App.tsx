import React from "react";
import ErrorBoundary from "./utils/ErrorBoundary";
const QuestionsApp = React.lazy(() => import("questionsApp/QuestionsApp"));
const RankingApp = React.lazy(() => import("rankingApp/RankingApp"));
const StatsApp = React.lazy(() => import("statsApp/StatsApp"));

const App = () => (
  <>
    <div className="header">
      <h1>CapQuizmini</h1>
    </div>
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
  </>
);

export default App;
