import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionCard from '../components/QuestionCard';
import { QuizQuestion } from '../types';

describe('QuestionCard Component', () => {
  const mockQuestion: QuizQuestion = {
    category: 'Science',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What is the chemical symbol for gold?',
    correct_answer: 'Au',
    incorrect_answers: ['Ag', 'Fe', 'Cu'],
  };
  
  const mockOnAnswerSelected = vi.fn();
  
  it('renders the question and answer options', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        questionIndex={0}
        userAnswer={undefined}
        showFeedback={false}
        onAnswerSelected={mockOnAnswerSelected}
      />
    );
    
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('What is the chemical symbol for gold?')).toBeInTheDocument();
    expect(screen.getByText('Au')).toBeInTheDocument();
    expect(screen.getByText('Ag')).toBeInTheDocument();
    expect(screen.getByText('Fe')).toBeInTheDocument();
    expect(screen.getByText('Cu')).toBeInTheDocument();
  });
  
  it('calls onAnswerSelected when an answer is clicked', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        questionIndex={0}
        userAnswer={undefined}
        showFeedback={false}
        onAnswerSelected={mockOnAnswerSelected}
      />
    );
    
    fireEvent.click(screen.getByText('Au'));
    expect(mockOnAnswerSelected).toHaveBeenCalledWith('Au');
  });
  
  it('shows feedback when showFeedback is true', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        questionIndex={0}
        userAnswer={{ questionIndex: 0, answer: 'Ag', isCorrect: false }}
        showFeedback={true}
        onAnswerSelected={mockOnAnswerSelected}
      />
    );
    
    expect(screen.getByText('Correct Answer: Au')).toBeInTheDocument();
  });
  
  it('highlights the correct answer when showing feedback', () => {
    const { container } = render(
      <QuestionCard
        question={mockQuestion}
        questionIndex={0}
        userAnswer={{ questionIndex: 0, answer: 'Ag', isCorrect: false }}
        showFeedback={true}
        onAnswerSelected={mockOnAnswerSelected}
      />
    );
    
    // Check that the correct answer has the 'correct' class
    const correctOption = screen.getByText('Au').closest('.answer-option');
    expect(correctOption).toHaveClass('correct');
    
    // Check that the user's incorrect answer has the 'incorrect' class
    const incorrectOption = screen.getByText('Ag').closest('.answer-option');
    expect(incorrectOption).toHaveClass('incorrect');
  });
});