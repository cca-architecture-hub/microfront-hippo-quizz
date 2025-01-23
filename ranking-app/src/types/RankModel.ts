interface UserData {
  name: string;
  score: number;
}

export interface RankModel {
  [key: string]: UserData;
}
