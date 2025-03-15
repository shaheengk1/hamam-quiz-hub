
import React from 'react';
import QuizCard from './QuizCard';
import { useGame } from '@/contexts/GameContext';

const QuizBoard: React.FC = () => {
  const { questions, answeredQuestions, setSelectedQuestionId, teams } = useGame();

  // Handle card click
  const handleCardClick = (questionId: number) => {
    setSelectedQuestionId(questionId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Display team scores at the top */}
      {teams.length > 0 && (
        <div className="flex justify-around mb-8 flex-wrap gap-4">
          {teams.map((team) => (
            <div key={team.id} className="bg-white shadow-md rounded-lg p-4 min-w-[160px]">
              <h3 className="font-bold text-lg">{team.name}</h3>
              <p className="text-2xl font-semibold">{team.score}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quiz card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {questions.map((question) => (
          <QuizCard
            key={question.id}
            questionId={question.id}
            onClick={() => handleCardClick(question.id)}
            isAnswered={answeredQuestions.includes(question.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizBoard;
