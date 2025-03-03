import { QuizQuestion, UserAnswer } from '../types';

// Shuffle an array using Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get all answer options for a question (correct + incorrect)
export const getAnswerOptions = (question: QuizQuestion): string[] => {
  return shuffleArray([question.correct_answer, ...question.incorrect_answers]);
};

// Calculate quiz score as a percentage
export const calculateScore = (userAnswers: UserAnswer[], totalQuestions: number): number => {
  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
  return Math.round((correctAnswers / totalQuestions) * 100);
};

// Format time in seconds to MM:SS format
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  
  return `${formattedMinutes}:${formattedSeconds}`;
};

// Calculate time taken in seconds
export const calculateTimeTaken = (startTime: number, endTime: number): number => {
  return Math.floor((endTime - startTime) / 1000);
};

// Get difficulty label
export const getDifficultyLabel = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return 'Easy';
    case 'medium':
      return 'Medium';
    case 'hard':
      return 'Hard';
    default:
      return 'Any';
  }
};

// Get category name from ID
export const getCategoryName = (categoryId: string): string => {
  const categories: Record<string, string> = {
    '9': 'General Knowledge',
    '10': 'Books',
    '11': 'Film',
    '12': 'Music',
    '13': 'Musicals & Theatre',
    '14': 'Television',
    '15': 'Video Games',
    '16': 'Board Games',
    '17': 'Science & Nature',
    '18': 'Computers',
    '19': 'Mathematics',
    '20': 'Mythology',
    '21': 'Sports',
    '22': 'Geography',
    '23': 'History',
    '24': 'Politics',
    '25': 'Art',
    '26': 'Celebrities',
    '27': 'Animals',
    '28': 'Vehicles',
    '29': 'Comics',
    '30': 'Gadgets',
    '31': 'Anime & Manga',
    '32': 'Cartoon & Animation',
  };
  
  return categories[categoryId] || 'Any Category';
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};