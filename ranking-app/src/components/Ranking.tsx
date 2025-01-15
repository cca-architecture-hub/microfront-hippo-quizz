import { RankModel } from "@/types/RankModel";

interface RankingProps {
  data: RankModel | undefined;
  player?: string;
}

export const Ranking: React.FC<RankingProps> = ({ data, player }) => {
  const users = data
    ? Object.entries(data).map(([id, user]) => ({ id, ...user }))
    : [];

    console.log(player)
    console.log(users)
  return (
    <div className="rankingContainer">
      <div>
        <h1>Ranking</h1>
        <ul>
          {users.map((user, index) => (
            <li key={user.id}
            style={{
              fontWeight: player && player === user.id ? 700 : 400 // Cambia el peso de la fuente según la condición
            }}
            >
              #{index + 1} {user.name} - {user.score} puntos
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
