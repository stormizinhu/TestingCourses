import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, MessageCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Forum = () => {
  const categories = [
    { id: '1', name: 'Testes Manuais', color: 'bg-green-500' },
    { id: '2', name: 'Automação', color: 'bg-blue-500' },
    { id: '3', name: 'Ferramentas', color: 'bg-purple-500' },
    { id: '4', name: 'Carreira', color: 'bg-orange-500' },
    { id: '5', name: 'Outros', color: 'bg-gray-500' },
  ];

  const topics = [
    {
      id: '1',
      title: 'Como criar testes de API com Postman?',
      author: 'Ana Silva',
      category: 'Automação',
      replies: 3,
      lastActivity: '10/06/2025',
    },
    {
      id: '2',
      title: 'Problemas com XPath no Selenium',
      author: 'Carlos Lima',
      category: 'Ferramentas',
      replies: 5,
      lastActivity: '09/06/2025',
    },
    {
      id: '3',
      title: 'Estratégias para testes mobile',
      author: 'Fernanda Alves',
      category: 'Testes Manuais',
      replies: 2,
      lastActivity: '08/06/2025',
    },
  ];

  const handleNewTopic = () => {
    toast({
      title: "Novo tópico",
      description: "🚧 Este recurso ainda não está implementado—mas você pode solicitá-lo no próximo prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Fórum QA - Testing Courses</title>
        <meta name="description" content="Participe das discussões da comunidade Testing Courses e tire suas dúvidas sobre testes de software" />
      </Helmet>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-1/4 hidden lg:block">
          <div className="bg-card p-6 rounded-xl shadow-lg sticky top-24 border">
            <h2 className="text-lg font-bold mb-4">Categorias</h2>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="w-full text-left px-4 py-2 rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-3/4 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Fórum QA</h1>
              <p className="text-muted-foreground">
                Participe, aprenda e compartilhe conhecimento.
              </p>
            </div>
            <Button onClick={handleNewTopic} variant="destructive">
              <Plus className="h-4 w-4 mr-2" />
              Novo Tópico
            </Button>
          </div>

          {/* Topics */}
          <div className="space-y-4">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/forum/${topic.id}`}>
                  <div className="bg-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border hover:border-primary">
                    <h3 className="text-lg font-bold mb-2 text-foreground">{topic.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{topic.replies} Respostas</span>
                      <span>Última atualização: {topic.lastActivity}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Forum;