
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import QuizBoard from '@/components/QuizBoard';
import QuestionModal from '@/components/QuestionModal';
import { useGame } from '@/contexts/GameContext';

const PlayerView = () => {
  const navigate = useNavigate();
  const { 
    selectedQuestionId, 
    answeredQuestions, 
    role, 
    setRole 
  } = useGame();

  // Set the role to 'player' when this component mounts
  useEffect(() => {
    setRole('player');
  }, [setRole]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Hamam Quiz Game</h1>
          </div>
          <div className="bg-blue-100 px-4 py-2 rounded-full">
            <span className="font-medium text-blue-800">Player View</span>
          </div>
        </header>
        
        <main>
          <QuizBoard />
          {selectedQuestionId !== null && <QuestionModal />}
        </main>
      </div>
    </div>
  );
};

export default PlayerView;
