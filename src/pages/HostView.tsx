
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import QuizBoard from '@/components/QuizBoard';
import QuestionModal from '@/components/QuestionModal';
import { useGame } from '@/contexts/GameContext';

const HostView = () => {
  const navigate = useNavigate();
  const { selectedQuestionId, resetGame } = useGame();

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
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetGame}>
              Reset Game
            </Button>
            <Button onClick={() => navigate('/admin')}>
              Admin Panel
            </Button>
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

export default HostView;
