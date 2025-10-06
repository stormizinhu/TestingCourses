import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import { CheckCircle, ArrowLeft, ArrowRight, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useProgress } from '@/hooks/useProgress';

import gratuitoTrack from '@/data/tracks/gratuito.json';
import basicoTrack from '@/data/tracks/basico.json';
import intermediarioTrack from '@/data/tracks/intermediario.json';
import avancadoTrack from '@/data/tracks/avancado.json';

const trackMap = {
  gratuito: gratuitoTrack.track,
  basico: basicoTrack.track,
  intermediario: intermediarioTrack.track,
  avancado: avancadoTrack.track,
};

const getYouTubeVideoId = (url) => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname.includes('/embed/')) {
        return urlObj.pathname.split('/embed/')[1];
      }
      return urlObj.searchParams.get('v');
    }
  } catch (e) {
    console.error('Invalid video URL', e);
    return null;
  }
  return null;
};

const LessonView = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { completeLesson, getNextLessonId } = useProgress();
  const [lesson, setLesson] = useState(null);
  const [nextLessonId, setNextLessonId] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    if (lessonId) {
      const [trackId, moduleIndex, lessonIndex] = lessonId.split('-');
      const track = trackMap[trackId];
      if (track && track.modules[moduleIndex] && track.modules[moduleIndex].lessons[lessonIndex]) {
        const currentLesson = track.modules[moduleIndex].lessons[lessonIndex];
        const videoId = getYouTubeVideoId(currentLesson.videoUrl);
        setLesson({
          ...currentLesson,
          id: lessonId,
          videoId: videoId,
        });
        setNextLessonId(getNextLessonId(lessonId));
      } else {
        setLesson(null);
      }
    }
    setQuizAnswers({});
    setShowResults(false);
    setIsPassed(false);
  }, [lessonId, getNextLessonId]);

  const handleQuizSubmit = () => {
    if (!lesson || !lesson.quiz) return;
    const correctAnswers = lesson.quiz.filter(
      (q) => quizAnswers[q.q] === q.answer
    ).length;
    const percentage = (correctAnswers / lesson.quiz.length) * 100;

    setShowResults(true);

    if (percentage >= 70) {
      setIsPassed(true);
      completeLesson(lesson.id);
      toast({
        title: "Parabéns! 🎉",
        description: `Você acertou ${correctAnswers} de ${lesson.quiz.length} questões (${percentage.toFixed(0)}%)`,
      });
    } else {
      setIsPassed(false);
      toast({
        title: "Tente novamente",
        description: `Você precisa de pelo menos 70% para passar. Você obteve ${percentage.toFixed(0)}%`,
        variant: "destructive",
      });
    }
  };

  const handleNextLesson = () => {
    if (nextLessonId) {
      navigate(`/dashboard/lesson/${nextLessonId}`);
    } else {
      toast({
        title: "Trilha Concluída!",
        description: "Você finalizou todas as aulas desta trilha. Parabéns!",
      });
      navigate(`/dashboard/tracks/${lessonId.split('-')[0]}`);
    }
  };

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <XCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold">Aula não encontrada</h2>
        <p className="text-muted-foreground">A aula que você está procurando não existe ou foi movida.</p>
        <Button onClick={() => navigate('/dashboard/tracks')} className="mt-4">
          Voltar para as Trilhas
        </Button>
      </div>
    );
  }

  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      rel: 0,
    },
  };

  return (
    <>
      <Helmet>
        <title>{lesson.title} - Testing Courses</title>
        <meta name="description" content={lesson.summary} />
      </Helmet>

      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/tracks/${lessonId.split('-')[0]}`)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para a Trilha
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg overflow-hidden border"
        >
          <div className="aspect-video bg-black">
            {lesson.videoId ? (
              <YouTube videoId={lesson.videoId} opts={youtubeOpts} className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                <p>Vídeo indisponível.</p>
              </div>
            )}
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
            <p className="text-muted-foreground">{lesson.summary}</p>
          </div>
        </motion.div>

        {lesson.quiz && lesson.quiz.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl shadow-lg p-6 border"
          >
            <h2 className="text-xl font-bold mb-6">Quiz de Verificação</h2>

            <div className="space-y-6">
              {lesson.quiz.map((question, qIndex) => (
                <div key={question.q} className="space-y-3">
                  <p className="font-medium">
                    {qIndex + 1}. {question.q}
                  </p>
                  <div className="space-y-2">
                    {question.choices.map((option, oIndex) => (
                      <label
                        key={oIndex}
                        className={`
                          flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors
                          ${quizAnswers[question.q] === oIndex
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                          }
                          ${showResults && oIndex === question.answer
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : ''
                          }
                          ${showResults && quizAnswers[question.q] === oIndex && oIndex !== question.answer
                            ? 'border-destructive bg-red-50 dark:bg-red-900/20'
                            : ''
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          checked={quizAnswers[question.q] === oIndex}
                          onChange={() => setQuizAnswers({ ...quizAnswers, [question.q]: oIndex })}
                          disabled={showResults}
                          className="form-radio text-primary focus:ring-primary"
                        />
                        <span>{option}</span>
                        {showResults && oIndex === question.answer && (
                          <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                        )}
                      </label>
                    ))}
                  </div>
                  {showResults && (
                    <p className="text-sm text-muted-foreground pl-4 pt-1">{question.explanation}</p>
                  )}
                </div>
              ))}
            </div>

            {!showResults && (
              <Button
                onClick={handleQuizSubmit}
                className="w-full mt-6"
                variant="destructive"
                disabled={Object.keys(quizAnswers).length !== lesson.quiz.length}
              >
                Enviar Respostas
              </Button>
            )}

            {showResults && (
              <div className="flex space-x-4 mt-6">
                <Button
                  onClick={() => {
                    setQuizAnswers({});
                    setShowResults(false);
                    setIsPassed(false);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Tentar Novamente
                </Button>
                <Button
                  onClick={handleNextLesson}
                  className="flex-1"
                  variant="destructive"
                  disabled={!isPassed}
                >
                  {nextLessonId ? 'Próxima Aula' : 'Finalizar Trilha'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default LessonView;