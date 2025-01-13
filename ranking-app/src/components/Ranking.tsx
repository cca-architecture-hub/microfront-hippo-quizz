import { RankModel } from "@/types/RankModel";

interface RankingProps {
  data: RankModel | undefined;
  player?: string;
}

export const Ranking: React.FC<RankingProps> = ({ data, player }) => {
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
              {player && player === user.id ? "->" : ""}
              #{index + 1} {user.name} - {user.score} puntos
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
