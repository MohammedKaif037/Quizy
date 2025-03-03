import { useState } from 'react';
import { QuizQuestion, UserAnswer } from '../types';
import { getAnswerOptions } from '../utils/helpers';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: QuizQuestion;
  questionIndex: number;
  userAnswer: UserAnswer | undefined;
  showFeedback: boolean;
  onAnswerSelected: (answer: string) => void;
}

const QuestionCard = ({
  question,
  questionIndex,
  userAnswer,
  showFeedback,
  onAnswerSelected,
}: QuestionCardProps) => {
  const [answerOptions] = useState(() => getAnswerOptions(question));
  
  const getOptionClassName = (option: string) => {
    let className = 'answer-option p-3 mb-2 rounded-md bg-white shadow-sm border border-gray-200';
    
    if (userAnswer?.answer === option) {
      className += ' selected';
      
      if (showFeedback) {
        className += userAnswer.isCorrect ? ' correct' : ' incorrect';
      }
    } else if (showFeedback && option === question.correct_answer) {
      className += ' correct';
    }
    
    return className;
  };
  
  return (
    <motion.div
      className="question-card glass-card p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full mb-2">
          Question {questionIndex + 1}
        </span>
        <h3 className="text-xl font-medium text-gray-800">{question.question}</h3>
        
        <div className="flex flex-wrap gap-2 mt-2 text-sm">
          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
            {question.category}
          </span>
          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full capitalize">
            {question.difficulty}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        {answerOptions.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 5 }}
            className={getOptionClassName(option)}
            onClick={() => !showFeedback && onAnswerSelected(option)}
          >
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={option}
                checked={userAnswer?.answer === option}
                onChange={() => onAnswerSelected(option)}
                disabled={showFeedback}
                className="mr-2"
              />
              <span>{option}</span>
              
              {showFeedback && option === question.correct_answer && (
                <CheckCircle className="ml-auto text-green-500" size={20} />
              )}
              
              {showFeedback && userAnswer?.answer === option && !userAnswer.isCorrect && (
                <XCircle className="ml-auto text-red-500" size={20} />
              )}
            </label>
          </motion.div>
        ))}
      </div>
      
      {showFeedback && (
        <div className="mt-4 p-3 bg-indigo-50 rounded-md">
          <p className="font-medium text-indigo-800">
            Correct Answer: {question.correct_answer}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default QuestionCard;