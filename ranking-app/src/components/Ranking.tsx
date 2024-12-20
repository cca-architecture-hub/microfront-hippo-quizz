import { RankModel } from "@/types/RankModel";

interface RankingProps {
  data: RankModel | undefined;
}

export const Ranking: React.FC<RankingProps> = ({ data }) => {
  const users = data
    ? Object.entries(data).map(([id, user]) => ({ id, ...user }))
    : [];
  return (
    <div className="rankingContainer">
      <div>
        <h1>Ranking</h1>
        <ul>
          {users.map((user, index) => (
            <li key={user.id}>
              #{index + 1} {user.name} - {user.score} puntos
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
