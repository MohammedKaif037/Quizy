import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { calculateScore, calculateTimeTaken, getCategoryName, getDifficultyLabel } from '../utils/helpers';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Award, Clock, BarChart3, Share2 } from 'lucide-react';
import Confetti from 'react-confetti';
import { toast } from 'react-toastify';

const ResultsSummary = () => {
  const navigate = useNavigate();
  const { 
    questions, 
    userAnswers, 
    startTime, 
    endTime,
    settings,
    addResult,
    resetQuiz
  } = useQuizStore();
  
  const score = calculateScore(userAnswers, questions.length);
  const timeTaken = startTime && endTime ? calculateTimeTaken(startTime, endTime) : 0;
  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
  const isPassing = score >= 60;
  
  useEffect(() => {
    if (questions.length === 0) {
      navigate('/');
      return;
    }
    
    // Save result to store
    if (startTime && endTime) {
      const result = {
        totalQuestions: questions.length,
        correctAnswers,
        score,
        timeTaken,
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        category: settings.category !== 'any' ? getCategoryName(settings.category) : 'Mixed',
        difficulty: settings.difficulty !== 'any' ? getDifficultyLabel(settings.difficulty) : 'Mixed',
      };
      
      addResult(result);
    }
  }, [questions, userAnswers, startTime, endTime, navigate, score, timeTaken, correctAnswers, settings, addResult]);
  
  const handleRetakeQuiz = () => {
    resetQuiz();
    navigate('/quiz');
  };
  
  const handleShareResult = () => {
    const text = `I scored ${score}% (${correctAnswers}/${questions.length}) on the QuizWiz ${getCategoryName(settings.category)} quiz!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My QuizWiz Result',
        text: text,
      }).catch(error => {
        console.error('Error sharing:', error);
      });
    } else {
      navigator.clipboard.writeText(text)
        .then(() => {
          toast.success('Result copied to clipboard!');
        })
        .catch(error => {
          console.error('Error copying to clipboard:', error);
          toast.error('Failed to copy result');
        });
    }
  };
  
  return (
    <>
      {isPassing && <Confetti recycle={false} numberOfPieces={500} />}
      
      <motion.div
        className="glass-card p-6 md:p-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Quiz Results
        </h2>
        
        <div className="flex flex-col items-center mb-8">
          <motion.div
            className={`text-5xl font-bold mb-2 ${
              isPassing ? 'text-green-500' : 'text-red-500'
            }`}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 260, 
              damping: 20,
              delay: 0.3 
            }}
          >
            {score}%
          </motion.div>
          
          <p className="text-xl text-gray-700">
            {isPassing ? 'Congratulations!' : 'Better luck next time!'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <Award className="text-indigo-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Correct Answers</p>
              <p className="text-lg font-semibold">{correctAnswers} / {questions.length}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <Clock className="text-indigo-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Time Taken</p>
              <p className="text-lg font-semibold">{Math.floor(timeTaken / 60)}m {timeTaken % 60}s</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <BarChart3 className="text-indigo-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="text-lg font-semibold">
                {settings.category !== 'any' 
                  ? getCategoryName(settings.category) 
                  : 'Mixed Categories'}
              </p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <BarChart3 className="text-indigo-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="text-lg font-semibold capitalize">
                {settings.difficulty !== 'any' 
                  ? settings.difficulty 
                  : 'Mixed Difficulty'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            className="btn btn-primary"
            onClick={handleRetakeQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retake Quiz
          </motion.button>
          
          <motion.button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            New Quiz
          </motion.button>
          
          <motion.button
            className="btn bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            onClick={handleShareResult}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={18} className="mr-1" />
            Share
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default ResultsSummary;