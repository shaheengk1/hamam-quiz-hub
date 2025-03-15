
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import Timer from './Timer';

const QuestionModal: React.FC = () => {
  const { 
    questions, 
    selectedQuestionId, 
    selectedAnswer, 
    setSelectedAnswer, 
    revealAnswer,
    setRevealAnswer, 
    closeQuestion,
    timerDuration,
    teams,
    updateTeamScore,
    role
  } = useGame();
  
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const question = selectedQuestionId !== null
    ? questions.find(q => q.id === selectedQuestionId)
    : null;

  useEffect(() => {
    // Reset state when a new question is selected
    setSelectedAnswer(null);
    setRevealAnswer(false);
    setSelectedTeam(null);
  }, [selectedQuestionId, setSelectedAnswer, setRevealAnswer]);
  
  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeQuestion();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeQuestion]);

  if (!question) return null;

  const handleAnswerClick = (index: number) => {
    if (role !== 'player' && !revealAnswer) {
      setSelectedAnswer(index);
    }
  };

  const handleRevealAnswer = () => {
    if (role !== 'player') {
      setRevealAnswer(true);
    }
  };

  const handleAwardPoints = () => {
    if (selectedTeam && selectedQuestionId !== null) {
      const question = questions.find(q => q.id === selectedQuestionId);
      if (question) {
        updateTeamScore(selectedTeam, question.points);
        closeQuestion();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 animate-zoom-in"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{question.category}</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={closeQuestion}
            className="rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Timer */}
        {role !== 'player' && (
          <div className="mb-6">
            <Timer duration={timerDuration} isRunning={!revealAnswer} />
          </div>
        )}
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`answer-option ${
                  revealAnswer
                    ? index === question.correctAnswer
                      ? 'correct'
                      : selectedAnswer === index
                      ? 'incorrect'
                      : ''
                    : selectedAnswer === index
                    ? 'bg-blue-100'
                    : ''
                }`}
                onClick={() => handleAnswerClick(index)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        
        {/* Controls - only shown to host/admin */}
        {role !== 'player' && (
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {!revealAnswer ? (
                <Button onClick={handleRevealAnswer} disabled={selectedAnswer === null}>
                  Reveal Answer
                </Button>
              ) : (
                <>
                  {/* Team selection and award points */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <select
                      className="border rounded p-2"
                      value={selectedTeam || ''}
                      onChange={(e) => setSelectedTeam(e.target.value || null)}
                    >
                      <option value="">Select team</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    
                    <Button 
                      onClick={handleAwardPoints}
                      disabled={!selectedTeam}
                    >
                      Award {question.points} Points
                    </Button>
                  </div>
                </>
              )}
            </div>
            
            <Button variant="outline" onClick={closeQuestion}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;
