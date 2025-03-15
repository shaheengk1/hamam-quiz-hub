
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import QuizBoard from '@/components/QuizBoard';
import QuestionModal from '@/components/QuestionModal';
import { useGame } from '@/contexts/GameContext';

const HostView = () => {
  const navigate = useNavigate();
  const { 
    selectedQuestionId, 
    resetGame, 
    setRole 
  } = useGame();

  // Set the role to 'host' when this component mounts
  useEffect(() => {
    setRole('host');
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
          <div className="flex gap-2 items-center">
            <div className="bg-purple-100 px-4 py-2 rounded-full mr-4">
              <span className="font-medium text-purple-800">Host View</span>
            </div>
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
