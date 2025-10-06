import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, BookOpen, Target, MessageSquare, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Admin = () => {
  const stats = [
    { label: 'Usuários Ativos', value: '1,234', icon: Users, color: 'text-blue-500' },
    { label: 'Trilhas', value: '12', icon: BookOpen, color: 'text-green-500' },
    { label: 'Missões', value: '45', icon: Target, color: 'text-purple-500' },
    { label: 'Tópicos no Fórum', value: '89', icon: MessageSquare, color: 'text-orange-500' },
  ];

  const handleAction = (action) => {
    toast({
      title: `${action}`,
      description: "🚧 Este recurso ainda não está implementado—mas você pode solicitá-lo no próximo prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Administração - Testing Courses</title>
        <meta name="description" content="Painel administrativo da plataforma Testing Courses" />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Gerencie conteúdo, usuários e métricas da plataforma.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-lg border"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Management Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl shadow-lg p-6 border"
        >
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="missions">Missões</TabsTrigger>
              <TabsTrigger value="metrics">Métricas</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Gerenciar Usuários</h3>
                <Button onClick={() => handleAction('Buscar usuário')}>
                  Buscar Usuário
                </Button>
              </div>
              <p className="text-muted-foreground">
                Gerencie usuários, altere papéis e bloqueie contas.
              </p>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Gerenciar Conteúdo</h3>
                <Button onClick={() => handleAction('Criar trilha')}>
                  Nova Trilha
                </Button>
              </div>
              <p className="text-muted-foreground">
                Crie e edite trilhas, módulos, aulas e quizzes.
              </p>
            </TabsContent>

            <TabsContent value="missions" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Gerenciar Missões</h3>
                <Button onClick={() => handleAction('Criar missão')}>
                  Nova Missão
                </Button>
              </div>
              <p className="text-muted-foreground">
                Crie e gerencie missões e badges.
              </p>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4 mt-6">
              <h3 className="text-lg font-bold">Métricas da Plataforma</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Taxa de Conclusão</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">NPS</p>
                  <p className="text-2xl font-bold">8.5</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </>
  );
};

export default Admin;