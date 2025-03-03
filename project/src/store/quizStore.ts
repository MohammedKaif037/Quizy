import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizQuestion, QuizSettings, UserAnswer, QuizResult } from '../types';
import { decode } from 'html-entities';

interface QuizState {
  // Quiz settings
  settings: QuizSettings;
  updateSettings: (settings: Partial<QuizSettings>) => void;
  
  // Quiz questions
  questions: QuizQuestion[];
  setQuestions: (questions: QuizQuestion[]) => void;
  
  // Quiz progress
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  
  // User answers
  userAnswers: UserAnswer[];
  addUserAnswer: (answer: UserAnswer) => void;
  clearUserAnswers: () => void;
  
  // Quiz timer
  startTime: number | null;
  endTime: number | null;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
  
  // Quiz results
  results: QuizResult[];
  addResult: (result: QuizResult) => void;
  
  // Quiz state
  isQuizActive: boolean;
  isQuizCompleted: boolean;
  setQuizActive: (active: boolean) => void;
  setQuizCompleted: (completed: boolean) => void;
  
  // Reset quiz
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      // Default quiz settings
      settings: {
        amount: 10,
        category: 'any',
        difficulty: 'any',
        type: 'any',
      },
      updateSettings: (newSettings) => 
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),
      
      // Quiz questions
      questions: [],
      setQuestions: (questions) => {
        // Decode HTML entities in questions and answers
        const decodedQuestions = questions.map(q => ({
          ...q,
          question: decode(q.question),
          correct_answer: decode(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map(a => decode(a))
        }));
        set({ questions: decodedQuestions });
      },
      
      // Quiz progress
      currentQuestionIndex: 0,
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      
      // User answers
      userAnswers: [],
      addUserAnswer: (answer) => 
        set((state) => {
          // Check if an answer for this question already exists
          const existingAnswerIndex = state.userAnswers.findIndex(
            (a) => a.questionIndex === answer.questionIndex
          );
          
          if (existingAnswerIndex !== -1) {
            // Replace existing answer
            const updatedAnswers = [...state.userAnswers];
            updatedAnswers[existingAnswerIndex] = answer;
            return { userAnswers: updatedAnswers };
          } else {
            // Add new answer
            return { userAnswers: [...state.userAnswers, answer] };
          }
        }),
      clearUserAnswers: () => set({ userAnswers: [] }),
      
      // Quiz timer
      startTime: null,
      endTime: null,
      setStartTime: (time) => set({ startTime: time }),
      setEndTime: (time) => set({ endTime: time }),
      
      // Quiz results
      results: [],
      addResult: (result) => 
        set((state) => ({ results: [result, ...state.results].slice(0, 10) })),
      
      // Quiz state
      isQuizActive: false,
      isQuizCompleted: false,
      setQuizActive: (active) => set({ isQuizActive: active }),
      setQuizCompleted: (completed) => set({ isQuizCompleted: completed }),
      
      // Reset quiz
      resetQuiz: () => set({
        currentQuestionIndex: 0,
        userAnswers: [],
        startTime: null,
        endTime: null,
        isQuizActive: false,
        isQuizCompleted: false,
      }),
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({
        // Only persist these fields
        settings: state.settings,
        results: state.results,
      }),
    }
  )
);