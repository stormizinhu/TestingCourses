import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bug, Bot, GitBranch, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/hooks/useProgress';

import gratuitoTrack from '@/data/tracks/gratuito.json';
import basicoTrack from '@/data/tracks/basico.json';
import intermediarioTrack from '@/data/tracks/intermediario.json';
import avancadoTrack from '@/data/tracks/avancado.json';

const Tracks = () => {
  const { getTrackProgress } = useProgress();

  const trackData = [
    { id: 'gratuito', data: gratuitoTrack.track, icon: Bug, color: 'from-green-500 to-emerald-600', locked: false },
    { id: 'basico', data: basicoTrack.track, icon: Bot, color: 'from-blue-500 to-cyan-600', locked: false },
    { id: 'intermediario', data: intermediarioTrack.track, icon: Bot, color: 'from-orange-500 to-red-600', locked: false },
    { id: 'avancado', data: avancadoTrack.track, icon: GitBranch, color: 'from-purple-500 to-pink-600', locked: true },
  ];

  return (
    <>
      <Helmet>
        <title>Trilhas de Aprendizado - Testing Courses</title>
        <meta name="description" content="Explore nossas trilhas de aprendizado em testes de software, desde o básico até o avançado" />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trilhas de Aprendizado</h1>
          <p className="text-muted-foreground">
            Escolha sua trilha e comece a aprender testes de software
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trackData.map((track, index) => {
            const Icon = track.icon;
            const progress = getTrackProgress(track.id);
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col border">
                  <div className={`h-32 bg-gradient-to-br ${track.color} p-6 flex items-start justify-between`}>
                    <div>
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold mb-2">
                        {track.data.level}
                      </span>
                      <h3 className="text-xl font-bold text-white">{track.data.title}</h3>
                    </div>
                    <Icon className="h-8 w-8 text-white/80" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">
                      {track.data.audience}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{track.data.modules.length} módulos</span>
                      {progress > 0 && <span>{progress}% completo</span>}
                    </div>

                    {progress > 0 && (
                      <div className="w-full bg-muted rounded-full h-2 mb-4">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${track.color}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                    
                    <div className="mt-auto">
                      <Link to={`/dashboard/tracks/${track.id}`} className={track.locked ? 'pointer-events-none' : ''}>
                        <Button className="w-full" disabled={track.locked} variant="destructive">
                          {track.locked ? <><Lock className="mr-2 h-4 w-4" /> Em breve</> : progress > 0 ? 'Continuar' : 'Começar'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default Tracks;