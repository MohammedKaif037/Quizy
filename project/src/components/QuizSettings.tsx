import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { fetchQuizCategories } from '../services/api';
import { QuizCategory } from '../types';
import { motion } from 'framer-motion';
import { Settings, Brain, Clock, BarChart } from 'lucide-react';

const QuizSettings = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, resetQuiz } = useQuizStore();
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchQuizCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    
    loadCategories();
  }, []);
  
  const handleStartQuiz = () => {
    setLoading(true);
    resetQuiz();
    setTimeout(() => {
      navigate('/quiz');
    }, 500);
  };
  
  return (
    <motion.div
      className="glass-card p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Settings className="text-indigo-600 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Quiz Settings</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="flex items-center text-gray-700 font-medium mb-2">
              <Brain className="mr-2" size={18} />
              Number of Questions
            </label>
            <select
              id="amount"
              value={settings.amount}
              onChange={(e) => updateSettings({ amount: Number(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="category" className="flex items-center text-gray-700 font-medium mb-2">
              <BarChart className="mr-2" size={18} />
              Category
            </label>
            <select
              id="category"
              value={settings.category}
              onChange={(e) => updateSettings({ category: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="any">Any Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="difficulty" className="flex items-center text-gray-700 font-medium mb-2">
              <Clock className="mr-2" size={18} />
              Difficulty
            </label>
            <select
              id="difficulty"
              value={settings.difficulty}
              onChange={(e) => updateSettings({ difficulty: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="type" className="flex items-center text-gray-700 font-medium mb-2">
              <BarChart className="mr-2" size={18} />
              Question Type
            </label>
            <select
              id="type"
              value={settings.type}
              onChange={(e) => updateSettings({ type: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="any">Any Type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <motion.button
          className="btn btn-primary w-full md:w-auto"
          onClick={handleStartQuiz}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Loading...' : 'Start Quiz'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizSettings;