import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Tracks from '@/pages/Tracks';
import TrackDetail from '@/pages/TrackDetail';
import LessonView from '@/pages/LessonView';
import StudyPlan from '@/pages/StudyPlan';
import Missions from '@/pages/Missions';
import Forum from '@/pages/Forum';
import ForumTopic from '@/pages/ForumTopic';
import Mentorship from '@/pages/Mentorship';
import Profile from '@/pages/Profile';
import Leaderboard from '@/pages/Leaderboard';
import Admin from '@/pages/Admin';
import Store from '@/pages/Store';
import ProductDetailPage from '@/pages/ProductDetailPage';
import SuccessPage from '@/pages/SuccessPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      
      <Route path="/dashboard" element={user ? <Layout /> : <Navigate to="/" />}>
        <Route index element={<Dashboard />} />
        <Route path="tracks" element={<Tracks />} />
        <Route path="tracks/:trackId" element={<TrackDetail />} />
        <Route path="lesson/:lessonId" element={<LessonView />} />
        <Route path="study-plan" element={<StudyPlan />} />
        <Route path="missions" element={<Missions />} />
        <Route path="forum" element={<Forum />} />
        <Route path="forum/:topicId" element={<ForumTopic />} />
        <Route path="mentorship" element={<Mentorship />} />
        <Route path="profile" element={<Profile />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="store" element={<Store />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        {user?.role === 'admin' && <Route path="admin" element={<Admin />} />}
      </Route>
      
      <Route path="/success" element={<SuccessPage />} />
      
      {/* Redirect any other authenticated routes to dashboard */}
      {user && <Route path="*" element={<Navigate to="/dashboard" />} />}
    </Routes>
  );
}

export default App;