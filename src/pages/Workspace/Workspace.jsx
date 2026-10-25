import React, { useContext, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Users, Activity, Plus, Trash2, CheckCircle2, User, ArrowLeft, Clock } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { TaskCard } from '../../components/TaskCard/TaskCard';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import './Workspace.css';

export const Workspace = () => {
  const { id } = useParams();
  const location = useLocation();
  const { projects, tasks, addTask, toggleTaskStatus, deleteTask, currentUser } = useContext(AppContext);

  const project = projects.find(p => p.id === id);

  // Form for adding task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskAssignee, setNewTaskAssignee] = useState(currentUser?.name || 'Manansh');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  if (!project) {
    return (
      <div className="container workspace-page">
        <div className="empty-state card">
          <h2>Workspace Not Found</h2>
          <p>The project workspace with ID "{id}" does not exist.</p>
          <Link to="/my-projects"><Button variant="copper">Back to My Projects</Button></Link>
        </div>
      </div>
    );
  }

  // Determine subview tab from URL path
  const path = location.pathname;
  let activeTab = 'overview';
  if (path.endsWith('/tasks')) activeTab = 'tasks';
  else if (path.endsWith('/team')) activeTab = 'team';
  else if (path.endsWith('/activity')) activeTab = 'activity';

  // Tasks for this specific project
  const projectTasks = tasks.filter(t => t.projectId === project.id);
  const completedCount = projectTasks.filter(t => t.status === 'completed').length;
  const totalCount = projectTasks.length;
  const calculatedProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleCreateTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(project.id, newTaskTitle.trim(), newTaskPriority, newTaskAssignee);
    setNewTaskTitle('');
    setShowAddTaskForm(false);
  };

  return (
    <div className="container workspace-page">
      <div className="workspace-layout">
        <Sidebar projectId={project.id} />

        <main className="workspace-main">
          {/* Header Banner */}
          <div className="workspace-header-card card">
            <div className="workspace-header-top">
              <span className="badge badge-evergreen">{project.category}</span>
              <span className="badge badge-copper">{project.status}</span>
            </div>

            <h1 className="workspace-title">{project.title}</h1>
            <p className="workspace-subtitle">{project.description}</p>

            <div className="workspace-progress-box">
              <div className="workspace-progress-meta">
                <span>Calculated Project Progress</span>
                <strong>{calculatedProgress}% ({completedCount}/{totalCount} Tasks Done)</strong>
              </div>
              <ProgressBar progress={calculatedProgress} size="lg" />
            </div>

            {/* Subview Nav Tabs */}
            <div className="workspace-tabs">
              <Link
                to={`/projects/${project.id}`}
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              >
                <LayoutDashboard size={16} /> Overview
              </Link>
              <Link
                to={`/projects/${project.id}/tasks`}
                className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
              >
                <CheckSquare size={16} /> Tasks ({projectTasks.length})
              </Link>
              <Link
                to={`/projects/${project.id}/team`}
                className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
              >
                <Users size={16} /> Team ({project.members.length})
              </Link>
              <Link
                to={`/projects/${project.id}/activity`}
                className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
              >
                <Activity size={16} /> Activity
              </Link>
            </div>
          </div>

          {/* Subview Content */}

          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="workspace-overview">
              <div className="grid-2">
                <div className="card overview-card">
                  <h3>Project Details</h3>
                  <div className="detail-row">
                    <span className="label">Owner:</span>
                    <span>{project.ownerName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Difficulty:</span>
                    <span>{project.difficulty}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Target Team Size:</span>
                    <span>{project.members.length} / {project.teamSize}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Goal:</span>
                    <span>{project.goal || 'Complete project evaluation.'}</span>
                  </div>
                </div>

                <div className="card overview-card">
                  <h3>Task Summary</h3>
                  <div className="task-summary-grid">
                    <div className="summary-box">
                      <span className="num">{totalCount}</span>
                      <span className="lbl">Total Tasks</span>
                    </div>
                    <div className="summary-box">
                      <span className="num">{completedCount}</span>
                      <span className="lbl">Completed</span>
                    </div>
                    <div className="summary-box">
                      <span className="num">{totalCount - completedCount}</span>
                      <span className="lbl">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. TASKS TAB */}
          {activeTab === 'tasks' && (
            <div className="workspace-tasks-view">
              <div className="section-header-flex">
                <h3>Task Management</h3>
                <Button variant="copper" icon={Plus} size="sm" onClick={() => setShowAddTaskForm(!showAddTaskForm)}>
                  {showAddTaskForm ? 'Close Form' : 'Add New Task'}
                </Button>
              </div>

              {/* Add Task Form */}
              {showAddTaskForm && (
                <div className="card add-task-card">
                  <h4>Create Project Task</h4>
                  <form onSubmit={handleCreateTaskSubmit} className="add-task-form">
                    <Input
                      label="Task Title"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="e.g. Build navigation header component"
                      required
                    />

                    <div className="grid-2">
                      <Input
                        label="Priority"
                        type="select"
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                        options={['High', 'Medium', 'Low']}
                      />

                      <Input
                        label="Assignee"
                        type="select"
                        value={newTaskAssignee}
                        onChange={(e) => setNewTaskAssignee(e.target.value)}
                        options={project.members.map(m => m.name)}
                      />
                    </div>

                    <div className="form-actions">
                      <Button type="submit" variant="copper" size="sm">
                        Create Task
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Task List */}
              <div className="tasks-list-stack">
                {projectTasks.length > 0 ? (
                  projectTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggleStatus={toggleTaskStatus}
                      onDelete={deleteTask}
                    />
                  ))
                ) : (
                  <div className="empty-state card">
                    <CheckSquare size={36} className="empty-state-icon" />
                    <p>No tasks added to this project workspace yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. TEAM TAB */}
          {activeTab === 'team' && (
            <div className="workspace-team-view">
              <div className="section-header-flex">
                <h3>Project Team Roster ({project.members.length})</h3>
                <Link to="/find-teammates">
                  <Button variant="outline" size="sm" icon={Users}>Invite Classmates</Button>
                </Link>
              </div>

              <div className="grid-2">
                {project.members.map((member, i) => (
                  <div key={i} className="card team-member-card">
                    <img
                      src={member.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=MananshBoy&backgroundColor=b6e3f4"}
                      alt={member.name}
                      className="team-avatar"
                    />
                    <div className="team-info">
                      <h4>{member.name}</h4>
                      <span className="badge badge-evergreen">{member.role}</span>
                    </div>
                    <Link to={`/profile/${member.id}`}>
                      <Button variant="ghost" size="sm">Profile</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. ACTIVITY TAB */}
          {activeTab === 'activity' && (
            <div className="workspace-activity-view">
              <h3>Project Activity History</h3>
              <div className="timeline card">
                <div className="timeline-item">
                  <div className="timeline-icon icon-evergreen"><CheckCircle2 size={16} /></div>
                  <div className="timeline-content">
                    <p>Project progress recalculated: <strong>{calculatedProgress}% completion</strong>.</p>
                    <span className="timeline-time">Just now</span>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon icon-copper"><Users size={16} /></div>
                  <div className="timeline-content">
                    <p><strong>{project.ownerName}</strong> created the project workspace.</p>
                    <span className="timeline-time">{project.createdAt || 'Sep 2026'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
