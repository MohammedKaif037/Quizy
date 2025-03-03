import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import ResultsSummary from '../components/ResultsSummary';

const Results = () => {
  const navigate = useNavigate();
  const { questions, isQuizCompleted } = useQuizStore();
  
  useEffect(() => {
    // Redirect to home if no quiz has been completed
    if (questions.length === 0 || !isQuizCompleted) {
      navigate('/');
    }
  }, [questions, isQuizCompleted, navigate]);
  
  return (
    <div className="py-6">
      <ResultsSummary />
    </div>
  );
};

export default Results;