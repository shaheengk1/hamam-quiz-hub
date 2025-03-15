import React, { createContext, useContext, useState, useEffect } from 'react';
import { QuizQuestion, defaultQuestions } from '@/data/quizQuestions';
import { toast } from '@/components/ui/use-toast';

export interface Team {
  id: string;
  name: string;
  score: number;
}

interface GameContextType {
  questions: QuizQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  selectedQuestionId: number | null;
  setSelectedQuestionId: React.Dispatch<React.SetStateAction<number | null>>;
  answeredQuestions: number[];
  setAnsweredQuestions: React.Dispatch<React.SetStateAction<number[]>>;
  selectedAnswer: number | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  revealAnswer: boolean;
  setRevealAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  addTeam: (name: string) => void;
  removeTeam: (id: string) => void;
  updateTeamScore: (id: string, score: number) => void;
  timerDuration: number;
  setTimerDuration: React.Dispatch<React.SetStateAction<number>>;
  role: 'admin' | 'host' | 'player' | null;
  setRole: React.Dispatch<React.SetStateAction<'admin' | 'host' | 'player' | null>>;
  resetGame: () => void;
  closeQuestion: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load data from localStorage if available
  const getInitialState = <T,>(key: string, defaultValue: T): T => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved) as T;
      } catch (e) {
        console.error('Failed to parse stored data', e);
        return defaultValue;
      }
    }
    return defaultValue;
  };

  const [questions, setQuestions] = useState<QuizQuestion[]>(getInitialState('questions', defaultQuestions));
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(getInitialState('selectedQuestionId', null));
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>(getInitialState('answeredQuestions', []));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(getInitialState('selectedAnswer', null));
  const [revealAnswer, setRevealAnswer] = useState<boolean>(getInitialState('revealAnswer', false));
  const [teams, setTeams] = useState<Team[]>(getInitialState('teams', []));
  const [timerDuration, setTimerDuration] = useState<number>(getInitialState('timerDuration', 30));
  const [role, setRole] = useState<'admin' | 'host' | 'player' | null>(getInitialState('role', null));

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('selectedQuestionId', JSON.stringify(selectedQuestionId));
  }, [selectedQuestionId]);

  useEffect(() => {
    localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
  }, [answeredQuestions]);

  useEffect(() => {
    localStorage.setItem('selectedAnswer', JSON.stringify(selectedAnswer));
  }, [selectedAnswer]);

  useEffect(() => {
    localStorage.setItem('revealAnswer', JSON.stringify(revealAnswer));
  }, [revealAnswer]);

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('timerDuration', JSON.stringify(timerDuration));
  }, [timerDuration]);

  useEffect(() => {
    localStorage.setItem('role', JSON.stringify(role));
  }, [role]);

  const addTeam = (name: string) => {
    if (name.trim() === '') {
      toast({
        title: 'Error',
        description: 'Team name cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    if (teams.some(team => team.name === name.trim())) {
      toast({
        title: 'Error',
        description: 'Team name already exists',
        variant: 'destructive',
      });
      return;
    }

    const newTeam: Team = {
      id: Date.now().toString(),
      name: name.trim(),
      score: 0,
    };
    
    setTeams([...teams, newTeam]);
  };

  const removeTeam = (id: string) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const updateTeamScore = (id: string, score: number) => {
    setTeams(teams.map(team => 
      team.id === id ? { ...team, score: team.score + score } : team
    ));
  };

  const resetGame = () => {
    setSelectedQuestionId(null);
    setAnsweredQuestions([]);
    setSelectedAnswer(null);
    setRevealAnswer(false);
    
    // Reset the questions but keep the teams
    setQuestions(defaultQuestions);
    
    toast({
      title: 'Game Reset',
      description: 'The game has been reset successfully.',
    });
  };

  const closeQuestion = () => {
    if (selectedQuestionId !== null) {
      if (selectedAnswer !== null) {
        // Add question to answered list only if an answer was selected
        setAnsweredQuestions([...answeredQuestions, selectedQuestionId]);
      }
      setSelectedQuestionId(null);
      setSelectedAnswer(null);
      setRevealAnswer(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
        questions,
        setQuestions,
        selectedQuestionId,
        setSelectedQuestionId,
        answeredQuestions,
        setAnsweredQuestions,
        selectedAnswer,
        setSelectedAnswer,
        revealAnswer,
        setRevealAnswer,
        teams,
        setTeams,
        addTeam,
        removeTeam,
        updateTeamScore,
        timerDuration,
        setTimerDuration,
        role,
        setRole,
        resetGame,
        closeQuestion
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
