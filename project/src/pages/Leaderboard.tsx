import { motion } from 'framer-motion';
import LeaderboardTable from '../components/LeaderboardTable';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center mb-4">
          <Trophy className="text-amber-500 mr-2" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
        </div>
        <p className="text-gray-600">
          Track your quiz performance and see your progress over time.
        </p>
      </motion.div>
      
      <LeaderboardTable />
    </div>
  );
};

export default Leaderboard;