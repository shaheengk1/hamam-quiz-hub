
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useGame } from '@/contexts/GameContext';

interface QuizCardProps {
  questionId: number;
  onClick: () => void;
  isAnswered: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ questionId, onClick, isAnswered }) => {
  const { questions } = useGame();
  const question = questions.find(q => q.id === questionId);
  
  if (!question) return null;
  
  return (
    <div 
      className={cn(
        "quiz-card aspect-[4/3] flex items-center justify-center",
        isAnswered ? "opacity-50 pointer-events-none" : "hover:scale-105"
      )}
      onClick={isAnswered ? undefined : onClick}
    >
      <div className="text-lg font-semibold text-center">
        {question.category}
      </div>
    </div>
  );
};

export default QuizCard;
