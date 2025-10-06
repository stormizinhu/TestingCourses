
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Trophy, Award, Flame, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Profile = () => {
  const { user } = useAuth();

  const badges = [
    { id: '1', name: 'Primeiro Quiz', icon: '🎯', earned: true },
    { id: '2', name: 'Streak 7 dias', icon: '🔥', earned: true },
    { id: '3', name: 'Primeira Trilha', icon: '🏆', earned: false },
    { id: '4', name: 'Mentor Ativo', icon: '👨‍🏫', earned: false },
  ];

  const skills = [
    { name: 'Testes Manuais', level: 3 },
    { name: 'Testes Automatizados', level: 2 },
    { name: 'Testes de API', level: 4 },
    { name: 'Testes de Performance', level: 1 },
    { name: 'Testes Mobile', level: 2 },
  ];

  return (
    <>
      <Helmet>
        <title>Perfil - Testing Courses</title>
        <meta name="description" content="Visualize seu perfil, conquistas e progresso na plataforma Testing Courses" />
      </Helmet>

      <div className="space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-destructive rounded-2xl p-8 text-white"
        >
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarFallback className="bg-white text-primary text-3xl">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
              <p className="text-white/80 mb-4">{user?.email}</p>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span className="font-semibold">{user?.points || 0} pontos</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Flame className="h-5 w-5" />
                  <span className="font-semibold">{user?.streak || 0} dias</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl shadow-lg p-6 border"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Comunicação</span>
              <Award className="h-5 w-5 text-purple-500" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-2xl ${i < 3 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">0</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl shadow-lg p-6 border"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Resolução de Problemas</span>
              <Award className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-2xl ${i < 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">0</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl shadow-lg p-6 border"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Trabalho em Equipe</span>
              <Award className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-2xl ${i < 3 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">0</span>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl shadow-lg p-6 border"
        >
          <h2 className="text-xl font-bold mb-4">Hard Skills</h2>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < skill.level ? 'text-destructive' : 'text-gray-300 dark:text-gray-600'
                          }`}
                        >
                          ●
                        </span>
                      ))}
                    </div>
                    <button className="text-primary hover:text-primary/80">
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl shadow-lg p-6 border"
        >
          <h2 className="text-xl font-bold mb-4">Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-xl text-center ${
                  badge.earned
                    ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30'
                    : 'bg-muted opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="text-sm font-semibold">{badge.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
