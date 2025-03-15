
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface TimerProps {
  duration: number;
  isRunning: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, isRunning }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [timerColor, setTimerColor] = useState('timer-blue');

  // Reset timer when duration changes or when isRunning changes to true
  useEffect(() => {
    if (isRunning) {
      setTimeLeft(duration);
    }
  }, [duration, isRunning]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime > 0 ? prevTime - 1 : 0;
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // Update color based on time left
  useEffect(() => {
    const percentage = (timeLeft / duration) * 100;
    
    if (percentage > 60) {
      setTimerColor('bg-timer-blue');
    } else if (percentage > 30) {
      setTimerColor('bg-timer-orange');
    } else {
      setTimerColor('bg-timer-red');
    }
  }, [timeLeft, duration]);

  const progressPercentage = (timeLeft / duration) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="font-medium">Time Remaining</span>
        <span className="font-medium">{timeLeft} seconds</span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-3 transition-all" 
        indicatorClassName={`${timerColor} transition-all duration-300`}
      />
    </div>
  );
};

export default Timer;
