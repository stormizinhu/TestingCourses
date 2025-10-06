import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState(new Set());

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('completedLessons');
      if (savedProgress) {
        setCompletedLessons(new Set(JSON.parse(savedProgress)));
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
      setCompletedLessons(new Set());
    }
  }, []);

  const completeLesson = (lessonId) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      newSet.add(lessonId);
      try {
        localStorage.setItem('completedLessons', JSON.stringify(Array.from(newSet)));
      } catch (error) {
        console.error("Failed to save progress to localStorage", error);
      }
      return newSet;
    });
  };

  const getNextLessonId = useCallback((currentLessonId) => {
    const [trackId, moduleIndexStr, lessonIndexStr] = currentLessonId.split('-');
    const moduleIndex = parseInt(moduleIndexStr, 10);
    const lessonIndex = parseInt(lessonIndexStr, 10);

    const track = trackMap[trackId];
    if (!track) return null;

    const currentModule = track.modules[moduleIndex];
    if (lessonIndex < currentModule.lessons.length - 1) {
      return `${trackId}-${moduleIndex}-${lessonIndex + 1}`;
    }

    if (moduleIndex < track.modules.length - 1) {
      return `${trackId}-${moduleIndex + 1}-0`;
    }

    return null; // End of track
  }, []);

  const getTrackProgress = useCallback((trackId) => {
    const track = trackMap[trackId];
    if (!track) return 0;

    const totalLessons = track.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    if (totalLessons === 0) return 0;

    const completedInTrack = Array.from(completedLessons).filter(id => id.startsWith(trackId)).length;
    
    return Math.round((completedInTrack / totalLessons) * 100);
  }, [completedLessons]);

  const value = {
    completedLessons,
    completeLesson,
    getNextLessonId,
    getTrackProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};