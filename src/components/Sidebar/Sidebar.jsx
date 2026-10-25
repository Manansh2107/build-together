import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, Users, Activity, Bell, Settings } from 'lucide-react';
import './Sidebar.css';

export const Sidebar = ({ projectId = null }) => {
  return (
    <aside className="sidebar card">
      <div className="sidebar-section">
        <span className="sidebar-section-title">Navigation</span>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/my-projects" className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}>
            <FolderKanban size={18} />
            <span>My Projects</span>
          </NavLink>
          <NavLink to="/notifications" className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}>
            <Bell size={18} />
            <span>Notifications</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}>
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      {projectId && (
        <div className="sidebar-section">
          <span className="sidebar-section-title">Workspace</span>
          <nav className="sidebar-nav">
            <NavLink to={`/projects/${projectId}`} end className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}>
              <FolderKanban size={18} />
              <span>Overview</span>
            </NavLink>
            <NavLink to={`/projects/${projectId}/tasks`} className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}>
              <CheckSquare size={18} />
              <span>Tasks</span>
            </NavLink>
            <NavLink to={`/projects/${projectId}/team`} className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}>
              <Users size={18} />
              <span>Team</span>
            </NavLink>
            <NavLink to={`/projects/${projectId}/activity`} className={({ isActive }) => isActive ? 'sidebar-item active' : 'sidebar-item'}>
              <Activity size={18} />
              <span>Activity</span>
            </NavLink>
          </nav>
        </div>
      )}
    </aside>
  );
};
