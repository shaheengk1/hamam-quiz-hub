
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TimerProps {
  duration: number;
  isRunning: boolean;
  onTimeUp?: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, isRunning, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [timerColor, setTimerColor] = useState('bg-blue-500');

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
        if (newTime === 0 && onTimeUp) {
          onTimeUp();
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeUp]);

  // Update color based on time left
  useEffect(() => {
    const percentage = (timeLeft / duration) * 100;
    
    if (percentage > 60) {
      setTimerColor('bg-blue-500');
    } else if (percentage > 30) {
      setTimerColor('bg-orange-500');
    } else {
      setTimerColor('bg-red-500');
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
      >
        <div 
          className={cn("h-full transition-all duration-300", timerColor)} 
          style={{ width: `${progressPercentage}%` }}
        />
      </Progress>
    </div>
  );
};

export default Timer;
