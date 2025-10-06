import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Leaderboard = () => {
  const { user } = useAuth();

  const rankings = [
    { id: '1', name: 'João Silva', points: 1250, rank: 1, image: 'https://i.pravatar.cc/150?img=11' },
    { id: '2', name: 'Maria Santos', points: 1180, rank: 2, image: 'https://i.pravatar.cc/150?img=12' },
    { id: '3', name: 'Pedro Costa', points: 1050, rank: 3, image: 'https://i.pravatar.cc/150?img=13' },
    { id: '4', name: user?.name || 'Você', points: user?.points || 0, rank: 4, isCurrentUser: true, image: 'https://i.pravatar.cc/150?img=14' },
    { id: '5', name: 'Ana Paula', points: 890, rank: 5, image: 'https://i.pravatar.cc/150?img=15' },
    { id: '6', name: 'Carlos Eduardo', points: 820, rank: 6, image: 'https://i.pravatar.cc/150?img=16' },
    { id: '7', name: 'Juliana Lima', points: 750, rank: 7, image: 'https://i.pravatar.cc/150?img=17' },
    { id: '8', name: 'Roberto Alves', points: 680, rank: 8, image: 'https://i.pravatar.cc/150?img=18' },
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-8 w-8 text-yellow-400" />;
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Award className="h-8 w-8 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Ranking - Testing Courses</title>
        <meta name="description" content="Veja o ranking dos melhores alunos da plataforma Testing Courses" />
      </Helmet>

      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Ranking Global</h1>
          <p className="text-muted-foreground">
            Veja os melhores alunos da plataforma e suba na classificação!
          </p>
        </div>

        {/* Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Rank 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl shadow-lg p-6 text-center border"
          >
            <div className="flex justify-center mb-4">{getRankIcon(2)}</div>
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarImage src={rankings[1].image} alt={rankings[1].name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">{rankings[1].name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-bold mb-2">{rankings[1].name}</h3>
            <p className="text-2xl font-bold text-destructive">{rankings[1].points} pts</p>
          </motion.div>
          
          {/* Rank 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="bg-card rounded-xl shadow-lg p-8 text-center border-2 border-yellow-400 relative"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-bold">
              1º LUGAR
            </div>
            <div className="flex justify-center mb-4 mt-4">{getRankIcon(1)}</div>
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={rankings[0].image} alt={rankings[0].name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">{rankings[0].name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold mb-2">{rankings[0].name}</h3>
            <p className="text-3xl font-bold text-destructive">{rankings[0].points} pts</p>
          </motion.div>

          {/* Rank 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl shadow-lg p-6 text-center border"
          >
            <div className="flex justify-center mb-4">{getRankIcon(3)}</div>
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarImage src={rankings[2].image} alt={rankings[2].name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">{rankings[2].name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-bold mb-2">{rankings[2].name}</h3>
            <p className="text-2xl font-bold text-destructive">{rankings[2].points} pts</p>
          </motion.div>
        </div>

        {/* Rest of rankings */}
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="semana">Esta Semana</TabsTrigger>
            <TabsTrigger value="turma">Minha Turma</TabsTrigger>
          </TabsList>
          <TabsContent value="geral">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl shadow-lg overflow-hidden border mt-4"
            >
              <div className="divide-y divide-border">
                {rankings.slice(3).map((player) => (
                  <div
                    key={player.id}
                    className={`p-4 flex items-center justify-between ${player.isCurrentUser ? 'bg-muted' : ''}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 text-center">{getRankIcon(player.rank)}</div>
                      <Avatar>
                        <AvatarImage src={player.image} alt={player.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {player.name}
                          {player.isCurrentUser && <span className="ml-2 text-xs text-primary">(Você)</span>}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-destructive">{player.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="semana">
             <p className="text-muted-foreground text-center p-8">Ranking da semana ainda não disponível.</p>
          </TabsContent>
          <TabsContent value="turma">
             <p className="text-muted-foreground text-center p-8">Você ainda não faz parte de uma turma.</p>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Leaderboard;