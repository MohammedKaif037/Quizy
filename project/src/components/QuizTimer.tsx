import { useState, useEffect } from 'react';
import { formatTime } from '../utils/helpers';

interface QuizTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

const QuizTimer = ({ duration, onTimeUp }: QuizTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);
  
  // Calculate circle properties
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - timeLeft / duration);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    
    // Set warning state when less than 20% time remains
    if (timeLeft <= duration * 0.2) {
      setIsWarning(true);
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, duration, onTimeUp]);
  
  return (
    <div className="timer-container">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle
          className="timer-background"
          cx="30"
          cy="30"
          r={radius}
          strokeWidth="4"
          stroke="#e5e7eb"
        />
        <circle
          className="timer-progress"
          cx="30"
          cy="30"
          r={radius}
          strokeWidth="4"
          stroke={isWarning ? '#ef4444' : '#6366f1'}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className={`timer-text ${isWarning ? 'text-red-500' : 'text-indigo-600'}`}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default QuizTimer;