import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/explore" element={<ExploreProjects />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
      <Route path="/find-teammates" element={<FindTeammates />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/create-project" element={<CreateProject />} />
      <Route path="/my-projects" element={<MyProjects />} />
      <Route path="/projects/:id" element={<Workspace />} />
      <Route path="/projects/:id/*" element={<Workspace />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
