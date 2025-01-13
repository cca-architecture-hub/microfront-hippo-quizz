declare module 'questionsApp/QuestionsApp' {
    const QuestionsApp: React.ComponentType;
    export default QuestionsApp;
  }

declare module 'rankingApp/RankingApp' {
    const RankingApp: React.FC<{player?: string}>;
    export default RankingApp;
}

declare module 'statsApp/StatsApp' {
    const StatsApp: React.ComponentType;
    export default StatsApp;
}