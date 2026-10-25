import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Users, FolderKanban, CheckSquare, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Button } from '../../components/Button/Button';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { TaskCard } from '../../components/TaskCard/TaskCard';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import './Dashboard.css';

export const Dashboard = () => {
  const { currentUser, projects, tasks, toggleTaskStatus, deleteTask } = useContext(AppContext);

  // Filter user's active projects (owner or member)
  const myProjects = projects.filter(p =>
    p.ownerId === currentUser?.id || p.members.some(m => m.id === currentUser?.id)
  );

  // Tasks belonging to my projects
  const myProjectIds = myProjects.map(p => p.id);
  const myTasks = tasks.filter(t => myProjectIds.includes(t.projectId));

  const activeTasksCount = myTasks.filter(t => t.status === 'pending').length;
  const completedTasksCount = myTasks.filter(t => t.status === 'completed').length;
  const totalTasksCount = myTasks.length;
  const overallProgress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // Recommended projects (projects user hasn't joined)
  const recommendedProjects = projects.filter(p =>
    p.ownerId !== currentUser?.id && !p.members.some(m => m.id === currentUser?.id)
  ).slice(0, 2);

  return (
    <div className="container dashboard-page">
      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          {/* Welcome Banner */}
          <div className="welcome-banner card">
            <div className="welcome-text">
              <span className="badge badge-evergreen">STUDENT DASHBOARD</span>
              <h1>Welcome back, {currentUser ? currentUser.name : 'Manansh'} 👋</h1>
              <p>Track your student projects, complete upcoming team tasks, and find new collaborators.</p>
            </div>
            <div className="welcome-actions">
              <Link to="/create-project">
                <Button variant="copper" icon={PlusCircle}>
                  Create Project
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline" icon={Search}>
                  Explore
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Statistics Overview */}
          <div className="stats-grid grid-4">
            <div className="stat-card card">
              <div className="stat-icon-wrap icon-evergreen">
                <FolderKanban size={20} />
              </div>
              <div className="stat-data">
                <span className="stat-value">{myProjects.length}</span>
                <span className="stat-title">My Projects</span>
              </div>
            </div>

            <div className="stat-card card">
              <div className="stat-icon-wrap icon-warning">
                <Clock size={20} />
              </div>
              <div className="stat-data">
                <span className="stat-value">{activeTasksCount}</span>
                <span className="stat-title">Active Tasks</span>
              </div>
            </div>

            <div className="stat-card card">
              <div className="stat-icon-wrap icon-info">
                <CheckSquare size={20} />
              </div>
              <div className="stat-data">
                <span className="stat-value">{completedTasksCount}</span>
                <span className="stat-title">Completed Tasks</span>
              </div>
            </div>

            <div className="stat-card card">
              <div className="stat-icon-wrap icon-copper">
                <TrendingUp size={20} />
              </div>
              <div className="stat-data">
                <span className="stat-value">{overallProgress}%</span>
                <span className="stat-title">Overall Completion</span>
              </div>
            </div>
          </div>

          {/* Active Projects Section */}
          <section className="dashboard-section">
            <div className="section-header-flex">
              <h2>My Active Projects</h2>
              <Link to="/my-projects" className="see-all-link">View All ({myProjects.length})</Link>
            </div>

            {myProjects.length > 0 ? (
              <div className="grid-2">
                {myProjects.map(proj => (
                  <ProjectCard key={proj.id} project={proj} />
                ))}
              </div>
            ) : (
              <div className="empty-state card">
                <FolderKanban size={40} className="empty-state-icon" />
                <h3 className="empty-state-title">No projects joined yet</h3>
                <p className="empty-state-desc">Create your first project idea or explore open projects looking for teammates.</p>
                <Link to="/create-project">
                  <Button variant="copper">Create Project</Button>
                </Link>
              </div>
            )}
          </section>

          {/* Tasks & Activity Two-Column Grid */}
          <div className="grid-2 dashboard-bottom-grid">
            {/* Upcoming Tasks */}
            <div className="dashboard-section">
              <div className="section-header-flex">
                <h2>Upcoming Tasks</h2>
                <span className="badge badge-copper">{activeTasksCount} Pending</span>
              </div>

              <div className="tasks-stack">
                {myTasks.length > 0 ? (
                  myTasks.slice(0, 4).map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggleStatus={toggleTaskStatus}
                      onDelete={deleteTask}
                    />
                  ))
                ) : (
                  <div className="empty-state card">
                    <CheckSquare size={32} className="empty-state-icon" />
                    <p>No tasks assigned yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recommended Projects */}
            <div className="dashboard-section">
              <div className="section-header-flex">
                <h2>Recommended Projects</h2>
                <Link to="/explore" className="see-all-link">Browse All</Link>
              </div>

              <div className="recommended-stack">
                {recommendedProjects.map(proj => (
                  <div key={proj.id} className="card rec-project-item">
                    <div className="rec-info">
                      <span className="badge badge-evergreen">{proj.category}</span>
                      <h4>{proj.title}</h4>
                      <p>{proj.description.substring(0, 80)}...</p>
                    </div>
                    <Link to={`/project/${proj.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
