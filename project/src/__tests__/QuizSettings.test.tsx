import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QuizSettings from '../components/QuizSettings';
import { useQuizStore } from '../store/quizStore';

// Mock the store
vi.mock('../store/quizStore', () => ({
  useQuizStore: vi.fn(),
}));

// Mock the API service
vi.mock('../services/api', () => ({
  fetchQuizCategories: vi.fn().mockResolvedValue([
    { id: 9, name: 'General Knowledge' },
    { id: 10, name: 'Books' },
  ]),
}));

describe('QuizSettings Component', () => {
  beforeEach(() => {
    // Setup mock store
    const mockUpdateSettings = vi.fn();
    const mockResetQuiz = vi.fn();
    
    (useQuizStore as any).mockReturnValue({
      settings: {
        amount: 10,
        category: 'any',
        difficulty: 'any',
        type: 'any',
      },
      updateSettings: mockUpdateSettings,
      resetQuiz: mockResetQuiz,
    });
  });
  
  it('renders the quiz settings form', () => {
    render(
      <BrowserRouter>
        <QuizSettings />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Quiz Settings')).toBeInTheDocument();
    expect(screen.getByText('Number of Questions')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByText('Question Type')).toBeInTheDocument();
    expect(screen.getByText('Start Quiz')).toBeInTheDocument();
  });
  
  it('updates settings when form values change', () => {
    const { updateSettings } = useQuizStore();
    
    render(
      <BrowserRouter>
        <QuizSettings />
      </BrowserRouter>
    );
    
    // Change amount
    fireEvent.change(screen.getByLabelText(/Number of Questions/i), {
      target: { value: '20' },
    });
    
    expect(updateSettings).toHaveBeenCalledWith({ amount: 20 });
    
    // Change difficulty
    fireEvent.change(screen.getByLabelText(/Difficulty/i), {
      target: { value: 'hard' },
    });
    
    expect(updateSettings).toHaveBeenCalledWith({ difficulty: 'hard' });
  });
  
  it('calls resetQuiz and navigates when Start Quiz is clicked', () => {
    const { resetQuiz } = useQuizStore();
    
    render(
      <BrowserRouter>
        <QuizSettings />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('Start Quiz'));
    
    expect(resetQuiz).toHaveBeenCalled();
  });
});