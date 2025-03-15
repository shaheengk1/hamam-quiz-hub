
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/components/ui/use-toast';
import { X, Plus, ArrowLeft, Timer, Users } from 'lucide-react';

const AdminPanel = () => {
  const { 
    questions, 
    setQuestions, 
    timerDuration, 
    setTimerDuration, 
    teams,
    addTeam,
    removeTeam, 
    resetGame 
  } = useGame();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    category: '',
    difficulty: 'easy' as const,
    points: 100
  });
  const [newTeamName, setNewTeamName] = useState('');
  const [activeTab, setActiveTab] = useState('teams');

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: name === 'points' || name === 'correctAnswer' ? parseInt(value) : value
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions
    });
  };

  const handleAddQuestion = () => {
    // Validate
    if (!newQuestion.question || !newQuestion.category || newQuestion.options.some(opt => !opt)) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Create new question
    const newId = Math.max(0, ...questions.map(q => q.id)) + 1;
    const questionToAdd = {
      ...newQuestion,
      id: newId
    };

    setQuestions([...questions, questionToAdd]);
    
    // Reset form
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      category: '',
      difficulty: 'easy',
      points: 100
    });

    toast({
      title: 'Success',
      description: 'Question added successfully',
    });
  };

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      addTeam(newTeamName);
      setNewTeamName('');
    }
  };

  const handleRemoveQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast({
      title: 'Question Removed',
      description: 'The question has been removed successfully',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="teams">
              <Users className="h-4 w-4 mr-2" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="questions">
              <Plus className="h-4 w-4 mr-2" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Timer className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Add and remove teams for the quiz game</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter team name"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                  />
                  <Button onClick={handleAddTeam}>Add Team</Button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Current Teams:</h3>
                  {teams.length === 0 ? (
                    <p className="text-sm text-gray-500">No teams added yet</p>
                  ) : (
                    <div className="space-y-2">
                      {teams.map((team) => (
                        <div key={team.id} className="flex justify-between items-center p-3 border rounded-md">
                          <span>{team.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTeam(team.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="question">Question</Label>
                    <Input
                      id="question"
                      name="question"
                      value={newQuestion.question}
                      onChange={handleQuestionChange}
                      placeholder="Enter the question"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Options</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                          />
                          <input
                            type="radio"
                            name="correctAnswer"
                            value={index}
                            checked={newQuestion.correctAnswer === index}
                            onChange={handleQuestionChange}
                            className="h-4 w-4"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Select the radio button next to the correct answer</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        name="category"
                        value={newQuestion.category}
                        onChange={handleQuestionChange}
                        placeholder="Enter category"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <select
                        id="difficulty"
                        name="difficulty"
                        value={newQuestion.difficulty}
                        onChange={handleQuestionChange}
                        className="w-full rounded-md border border-input px-3 py-2"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="points">Points</Label>
                      <Input
                        id="points"
                        name="points"
                        type="number"
                        value={newQuestion.points}
                        onChange={handleQuestionChange}
                        min={10}
                        step={10}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddQuestion}>Add Question</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Questions</CardTitle>
                <CardDescription>Edit or remove existing questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {questions.map((question) => (
                  <div key={question.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{question.question}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveQuestion(question.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className={`p-2 border rounded ${index === question.correctAnswer ? 'bg-green-100 border-green-300' : ''}`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Category: {question.category}</span>
                      <span>Difficulty: {question.difficulty}</span>
                      <span>Points: {question.points}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Game Settings</CardTitle>
                <CardDescription>Configure timer and other game settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timerDuration">Timer Duration (seconds)</Label>
                  <Input
                    id="timerDuration"
                    type="number"
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(Number(e.target.value))}
                    min={5}
                    max={120}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={resetGame}>
                  Reset Game
                </Button>
                <Button onClick={() => navigate('/host')}>
                  Go to Host View
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
