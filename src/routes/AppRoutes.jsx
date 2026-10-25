import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ProtectedRoute } from './ProtectedRoute';
import { Landing } from '../pages/Landing/Landing';
import { HowItWorks } from '../pages/HowItWorks/HowItWorks';
import { SignIn } from '../pages/Auth/SignIn';
import { SignUp } from '../pages/Auth/SignUp';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { ExploreProjects } from '../pages/ExploreProjects/ExploreProjects';
import { ProjectDetails } from '../pages/ProjectDetails/ProjectDetails';
import { FindTeammates } from '../pages/FindTeammates/FindTeammates';
import { Profile } from '../pages/Profile/Profile';
import { CreateProject } from '../pages/CreateProject/CreateProject';
import { MyProjects } from '../pages/MyProjects/MyProjects';
import { Workspace } from '../pages/Workspace/Workspace';
import { Notifications } from '../pages/Notifications/Notifications';
import { Settings } from '../pages/Settings/Settings';
import { NotFound } from '../pages/NotFound/NotFound';

export const AppRoutes = () => {
  const { currentUser } = useContext(AppContext);

  return (
    <Routes>
      {/* Root Route: If logged in, shows Landing; if guest, redirects to open /how-it-works page */}
      <Route
        path="/"
        element={
          currentUser ? <Landing /> : <Navigate to="/how-it-works" replace />
        }
      />

      {/* Public Pages: Open to everyone without signing in */}
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Protected Pages: Locked until user signs in or creates an account */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <ExploreProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project/:id"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/find-teammates"
        element={
          <ProtectedRoute>
            <FindTeammates />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-project"
        element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-projects"
        element={
          <ProtectedRoute>
            <MyProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <Workspace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id/*"
        element={
          <ProtectedRoute>
            <Workspace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
