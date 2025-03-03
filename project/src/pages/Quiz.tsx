import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { fetchQuizQuestions } from '../services/api';
import { toast } from 'react-toastify';
import QuestionCard from '../components/QuestionCard';
import QuizTimer from '../components/QuizTimer';
import ProgressBar from '../components/ProgressBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const Quiz = () => {
  const navigate = useNavigate();
  const {
    settings,
    questions,
    setQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    addUserAnswer,
    setStartTime,
    setEndTime,
    setQuizActive,
    setQuizCompleted,
    isQuizActive,
    isQuizCompleted,
  } = useQuizStore();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Calculate time per question (30 seconds per question)
  const timePerQuestion = 30;
  const totalTime = settings.amount * timePerQuestion;
  
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedQuestions = await fetchQuizQuestions(settings);
        
        if (fetchedQuestions.length === 0) {
          setError('No questions available for these settings. Please try different options.');
          setLoading(false);
          return;
        }
        
        setQuestions(fetchedQuestions);
        
        // Record start time
        setStartTime(Date.now());
        setQuizActive(true);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setError(error instanceof Error ? error.message : 'Failed to load questions. Please try again with different settings.');
        setLoading(false);
      }
    };
    
    loadQuestions();
    
    // Cleanup function
    return () => {
      if (isQuizActive && !isQuizCompleted) {
        // If navigating away during an active quiz
        toast.info('Quiz progress has been saved');
      }
    };
  }, [settings, setQuestions, setStartTime, setQuizActive, isQuizActive, isQuizCompleted]);
  
  const handleAnswerSelected = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    
    addUserAnswer({
      questionIndex: currentQuestionIndex,
      answer,
      isCorrect,
    });
  };
  
  const handleNextQuestion = () => {
    if (showFeedback) {
      setShowFeedback(false);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (showFeedback) {
      setShowFeedback(false);
    }
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleShowFeedback = () => {
    setShowFeedback(true);
  };
  
  const handleSubmitQuiz = () => {
    // Record end time
    setEndTime(Date.now());
    setQuizCompleted(true);
    
    // Navigate to results page
    navigate('/results');
  };
  
  const handleTimeUp = () => {
    toast.warning('Time is up! Your quiz has been submitted.');
    handleSubmitQuiz();
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No questions available. Please try different settings.</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers.find(
    (answer) => answer.questionIndex === currentQuestionIndex
  );
  const answeredCount = userAnswers.length;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quiz in Progress</h2>
        <QuizTimer duration={totalTime} onTimeUp={handleTimeUp} />
      </div>
      
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="text-sm text-gray-600">
          {answeredCount} of {questions.length} answered
        </div>
      </div>
      
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        userAnswer={currentAnswer}
        showFeedback={showFeedback}
        onAnswerSelected={handleAnswerSelected}
      />
      
      <div className="flex flex-wrap justify-between gap-2">
        <motion.button
          className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={18} className="mr-1" />
          Previous
        </motion.button>
        
        <div className="flex gap-2">
          {currentAnswer && !showFeedback && (
            <motion.button
              className="btn bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              onClick={handleShowFeedback}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show Answer
            </motion.button>
          )}
          
          {isLastQuestion ? (
            <motion.button
              className="btn btn-success"
              onClick={handleSubmitQuiz}
              disabled={answeredCount < questions.length}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckCircle size={18} className="mr-1" />
              Submit Quiz
            </motion.button>
          ) : (
            <motion.button
              className="btn btn-primary"
              onClick={handleNextQuestion}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
              <ArrowRight size={18} className="ml-1" />
            </motion.button>
          )}
        </div>
      </div>
      
      {answeredCount < questions.length && isLastQuestion && (
        <div className="mt-4 p-3 bg-amber-50 text-amber-700 rounded-md">
          Please answer all questions before submitting the quiz.
        </div>
      )}
    </div>
  );
};

export default Quiz;