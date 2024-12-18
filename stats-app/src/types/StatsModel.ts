export interface StatsModel {
  totalQuestions: number;
  categoryStats: CategoryStats;
}

export interface CategoryStats {
  Science: Science;
  History: History;
  Geography: Geography;
  Entertainment: Entertainment;
  Sports: Sports;
  Technology: Technology;
}

export interface Science {
  total: number;
  correct: number;
}

export interface History {
  total: number;
  correct: number;
}

export interface Geography {
  total: number;
  correct: number;
}

export interface Entertainment {
  total: number;
  correct: number;
}

export interface Sports {
  total: number;
  correct: number;
}

export interface Technology {
  total: number;
  correct: number;
}
