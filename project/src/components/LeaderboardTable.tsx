import { useState } from 'react';
import { useQuizStore } from '../store/quizStore';
import { format, parseISO } from 'date-fns';
import { Trophy, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const LeaderboardTable = () => {
  const { results } = useQuizStore();
  const [sortBy, setSortBy] = useState<'score' | 'date'>('score');
  
  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'score') {
      return b.score - a.score;
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
  
  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No quiz results yet. Take a quiz to see your results here!</p>
      </div>
    );
  }
  
  return (
    <div className="glass-card p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Your Quiz History</h2>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              sortBy === 'score'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('score')}
          >
            Sort by Score
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              sortBy === 'date'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSortBy('date')}
          >
            Sort by Date
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedResults.map((result, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  {index === 0 && <Trophy className="text-amber-500 inline" size={16} />}
                  {index === 1 && <Trophy className="text-gray-400 inline" size={16} />}
                  {index === 2 && <Trophy className="text-amber-700 inline" size={16} />}
                  {index > 2 && <span className="text-gray-500">{index + 1}</span>}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {format(parseISO(result.date), 'MMM d, yyyy HH:mm')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {result.category}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {result.difficulty}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <Award className="text-indigo-500 mr-1" size={16} />
                    <span className="text-sm font-medium text-gray-900">
                      {result.score}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="text-indigo-500 mr-1" size={16} />
                    <span className="text-sm text-gray-500">
                      {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;