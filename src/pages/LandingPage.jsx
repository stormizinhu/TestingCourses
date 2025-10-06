
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bug, Target, Trophy, Users, MessageSquare, Layers, ArrowRight, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const features = [{
  icon: Layers,
  title: "Trilhas de Aprendizagem",
  description: "Evolua com conteúdos organizados por níveis: Gratuito, Básico, Intermediário e Avançado.",
  color: "text-blue-500"
}, {
  icon: Target,
  title: "Missões Práticas (QA Mission)",
  description: "Enfrente desafios que simulam cenários reais de QA ao final de cada módulo.",
  color: "text-purple-500"
}, {
  icon: Bug,
  title: "Falhas Controladas",
  description: "Aprenda a debugar com um sistema que injeta bugs para você identificar e corrigir.",
  color: "text-destructive"
}, {
  icon: Trophy,
  title: "Ranking Gamificado",
  description: "Acumule pontos, compare seu desempenho e compita de forma saudável com outros alunos.",
  color: "text-yellow-500"
}, {
  icon: Users,
  title: "Mentoria Personalizada",
  description: "Tenha acesso a sessões individuais com profissionais experientes para orientar sua carreira.",
  color: "text-green-500"
}, {
  icon: MessageSquare,
  title: "Comunidade Ativa",
  description: "Participe de fóruns e chats para trocar conhecimento com colegas e mentores em tempo real.",
  color: "text-cyan-500"
}];

const LandingPage = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <>
      <Helmet>
        <title>Testing Courses - Acelere sua Carreira em QA</title>
        <meta name="description" content="Plataforma de aprendizado gamificada para testes de software com missões práticas, mentorias e uma comunidade ativa." />
      </Helmet>
      <div className="bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img class="h-8 hidden dark:block" alt="Testing Company Logo" src="https://horizons-cdn.hostinger.com/0a238b5f-27c7-4b77-ba83-31f710594744/tc-removebg-preview-rOLCk.png" />
              <img class="h-8 dark:hidden" alt="Testing Company Logo" src="https://horizons-cdn.hostinger.com/0a238b5f-27c7-4b77-ba83-31f710594744/tc-removebg-preview-dLyNU.png" />
            </Link>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Link to="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button variant="destructive">
                  Começar Agora
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main>
          <section className="py-20 md:py-32 hero-circuit-bg text-white">
            <div className="container mx-auto px-4 text-center content relative z-10">
              <motion.h1 initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5
            }} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                Aprenda QA de Forma Gamificada
              </motion.h1>
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.1
            }} className="text-lg md:text-xl max-w-3xl mx-auto text-white/80 mb-10">Formação prática, interativa e escalável para talentos em Quality Assurance.</motion.p>
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }}>
                <Link to="/register">
                  <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-white font-bold text-lg">
                    Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-secondary">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Uma plataforma, todos os recursos</h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Ferramentas projetadas para transformar seu aprendizado e preparar você para o mercado.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                const Icon = feature.icon;
                return <motion.div key={feature.title} initial={{
                  opacity: 0,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.5,
                  delay: index * 0.05
                }} className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                          <Icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-card-foreground">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </motion.div>;
              })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para se tornar um expert em QA?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de alunos e comece a transformar sua carreira hoje mesmo.
              </p>
              <Link to="/register">
                <Button size="lg" variant="destructive" className="font-bold">
                  Criar Minha Conta Gratuita
                </Button>
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-secondary border-t border-border">
          <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img class="h-6 hidden dark:block" alt="Testing Company Logo" src="https://horizons-cdn.hostinger.com/0a238b5f-27c7-4b77-ba83-31f710594744/tc-removebg-preview-rOLCk.png" />
              <img class="h-6 dark:hidden" alt="Testing Company Logo" src="https://horizons-cdn.hostinger.com/0a238b5f-27c7-4b77-ba83-31f710594744/tc-removebg-preview-dLyNU.png" />
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} Testing Company. Todos os direitos reservados.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <Link to="#" className="text-sm hover:text-destructive">Termos de Serviço</Link>
              <Link to="#" className="text-sm hover:text-destructive">Política de Privacidade</Link>
            </div>
          </div>
        </footer>
      </div>
    </>;
};
export default LandingPage;
