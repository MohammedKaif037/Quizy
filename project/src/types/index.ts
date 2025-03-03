export interface QuizCategory {
  id: number;
  name: string;
}

export interface QuizDifficulty {
  id: string;
  name: string;
}

export interface QuizType {
  id: string;
  name: string;
}

export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizSettings {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
}

export interface UserAnswer {
  questionIndex: number;
  answer: string;
  isCorrect: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeTaken: number;
  date: string;
  category: string;
  difficulty: string;
}

export interface LeaderboardEntry extends QuizResult {
  id: string;
  username: string;
}