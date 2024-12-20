export interface StatsModel {
  totalQuestions: number;
  categoryStats: CategoryStats;
}

export interface CategoryStats {
  Science: Category;
  History: Category;
  Geography: Category;
  Entertainment: Category;
  Sports: Category;
  Technology: Category;
}

export interface Category {
  total: number;
  correct: number;
}
