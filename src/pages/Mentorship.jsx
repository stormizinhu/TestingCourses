import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Calendar, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';

const Mentorship = () => {
  const mentors = [
    {
      id: '1',
      name: 'Ana Souza',
      bio: 'Testes Automatizados, Testes de API, Cypress',
      available: true,
      image: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '2',
      name: 'Carlos Lima',
      bio: 'Testes de Performance, JMeter, K6',
      available: false,
      image: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: '3',
      name: 'Fernanda Alves',
      bio: 'Testes Mobile, Appium, Android, iOS',
      available: true,
      image: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: '4',
      name: 'Ricardo Silva',
      bio: 'QA Estratégico, Testes Manuais, Exploratórios',
      available: true,
      image: 'https://i.pravatar.cc/150?img=8'
    },
  ];

  const appointments = [
    {
      id: '1',
      mentor: 'Ana Souza',
      date: '15/06/2025',
      time: '14:00',
      status: 'confirmed',
    },
    {
      id: '2',
      mentor: 'Ricardo Silva',
      date: '20/06/2025',
      time: '10:00',
      status: 'pending',
    },
  ];

  const handleRequestMentorship = (mentorId) => {
    toast({
      title: "Solicitação enviada!",
      description: "🚧 Este recurso ainda não está implementado—mas você pode solicitá-lo no próximo prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Mentorias - Testing Courses</title>
        <meta name="description" content="Agende mentorias com especialistas em testes de software e acelere seu aprendizado" />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Mentoria</h1>
          <p className="text-muted-foreground">
            Conecte-se com especialistas e acelere sua carreira.
          </p>
        </div>

        {/* My Appointments */}
        {appointments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl shadow-lg p-6 border"
          >
            <h2 className="text-xl font-bold mb-4">Minhas Mentorias Agendadas</h2>
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">{appointment.mentor}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} às {appointment.time}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {appointment.status === 'confirmed' ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span>Confirmada</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4" />
                        <span>Pendente</span>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mentors */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl shadow-lg p-6 text-center flex flex-col items-center border"
              >
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={mentor.image} alt={mentor.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {mentor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {mentor.bio}
                </p>
                
                <div className="w-full mt-auto space-y-2">
                   <div
                    className={`w-full py-1 rounded text-sm font-bold ${
                      mentor.available
                        ? 'bg-green-500 text-white'
                        : 'bg-destructive text-white'
                    }`}
                  >
                    {mentor.available ? 'Disponível' : 'Indisponível'}
                  </div>
                  <Button
                    onClick={() => handleRequestMentorship(mentor.id)}
                    disabled={!mentor.available}
                    className="w-full"
                    variant="destructive"
                  >
                    Agendar Mentoria
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mentorship;