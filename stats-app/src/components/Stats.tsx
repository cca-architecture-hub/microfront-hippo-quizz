import { StatsModel } from "../types/StatsModel";
import { CategoryCard } from "./CategoryCard";

interface StatsProps {
    data: StatsModel;
};

export const Stats: React.FC<StatsProps> = ({ data }) => {
   
    const categories = Object.entries(data.categoryStats).map(
        ([name, stats]) => {
          const percentage = ((stats.total / data.totalQuestions) * 100).toFixed(0);
          const amount = stats.total;
          return { name, percentage, best: "N/A", amount }; // "Best" es estático por ahora
        }
      );

  return (
    <div
     className="statsContainer"
    >
      {categories.map((category, index) => (
        <CategoryCard
          key={index}
          name={category.name}
          percentage={category.percentage}
          best={category.best}
          amount={category.amount}
        />
      ))}
      <h2>Total questions: {data.totalQuestions}</h2>
    </div>
  )
}
