import { motion } from 'framer-motion';
import QuizSettings from '../components/QuizSettings';
import { Brain, Award, Clock, BarChart3 } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
          Welcome to QuizWiz
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Test your knowledge with our interactive quizzes across various categories and difficulty levels.
        </p>
      </motion.div>
      
      <div className="mb-12">
        <QuizSettings />
      </div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="glass-card p-6 flex items-start">
          <div className="bg-indigo-100 p-3 rounded-full mr-4">
            <Brain className="text-indigo-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Multiple Categories
            </h3>
            <p className="text-gray-600">
              Choose from a wide range of categories including General Knowledge, Science, History, Entertainment, and more.
            </p>
          </div>
        </div>
        
        <div className="glass-card p-6 flex items-start">
          <div className="bg-amber-100 p-3 rounded-full mr-4">
            <BarChart3 className="text-amber-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Adjustable Difficulty
            </h3>
            <p className="text-gray-600">
              Select your preferred difficulty level from easy to hard to match your knowledge and experience.
            </p>
          </div>
        </div>
        
        <div className="glass-card p-6 flex items-start">
          <div className="bg-emerald-100 p-3 rounded-full mr-4">
            <Clock className="text-emerald-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Timed Challenges
            </h3>
            <p className="text-gray-600">
              Test your knowledge under pressure with our timed quizzes. The clock is ticking!
            </p>
          </div>
        </div>
        
        <div className="glass-card p-6 flex items-start">
          <div className="bg-rose-100 p-3 rounded-full mr-4">
            <Award className="text-rose-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Track Your Progress
            </h3>
            <p className="text-gray-600">
              Keep track of your quiz history and see how your knowledge improves over time.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;