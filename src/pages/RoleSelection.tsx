
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { useNavigate } from 'react-router-dom';
import { UserRound, Users, ShieldAlert } from 'lucide-react';

const RoleSelection = () => {
  const { setRole } = useGame();
  const navigate = useNavigate();

  const selectRole = (role: 'admin' | 'host' | 'player') => {
    setRole(role);
    
    switch (role) {
      case 'admin':
        navigate('/admin-login');
        break;
      case 'host':
        navigate('/host');
        break;
      case 'player':
        navigate('/player');
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Hamam Quiz Game</h1>
        <p className="text-gray-600">Select your role to get started</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <Card className="role-card hover:border-primary" onClick={() => selectRole('admin')}>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full">
              <ShieldAlert className="h-10 w-10 text-primary" />
            </div>
            <CardTitle>Admin</CardTitle>
            <CardDescription>Manage questions and game settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              As an admin, you can edit questions, add teams, and configure game settings.
            </p>
          </CardContent>
        </Card>
        
        <Card className="role-card hover:border-primary" onClick={() => selectRole('host')}>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full">
              <UserRound className="h-10 w-10 text-primary" />
            </div>
            <CardTitle>Host</CardTitle>
            <CardDescription>Run the game and control questions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              As the host, you can select questions, reveal answers, and award points to teams.
            </p>
          </CardContent>
        </Card>
        
        <Card className="role-card hover:border-primary" onClick={() => selectRole('player')}>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <CardTitle>Player</CardTitle>
            <CardDescription>Join the game as a player</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              As a player, you'll see the questions and answers in real-time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleSelection;
