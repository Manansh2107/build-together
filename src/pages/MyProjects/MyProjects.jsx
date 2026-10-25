import React, { useState, useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PlusCircle, FolderKanban, FolderCheck, Users, Sparkles, Bookmark } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectSavedProjectIds } from '../../store/slices/bookmarksSlice';
import { AppContext } from '../../context/AppContext';
import { Button } from '../../components/Button/Button';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import './MyProjects.css';

export const MyProjects = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'all';
  const { currentUser, projects } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(initialTab);

  const savedProjectIds = useSelector(selectSavedProjectIds);
  const savedProjects = projects.filter(p => savedProjectIds.includes(p.id));

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const myCreated = projects.filter(p => p.ownerId === currentUser?.id);
  const myJoined = projects.filter(p =>
    p.ownerId !== currentUser?.id && p.members.some(m => m.id === currentUser?.id)
  );
  const myAll = projects.filter(p =>
    p.ownerId === currentUser?.id || p.members.some(m => m.id === currentUser?.id)
  );
  const myCompleted = myAll.filter(p => p.status === 'Completed' || p.progress === 100);

  const getDisplayedProjects = () => {
    switch (activeTab) {
      case 'created': return myCreated;
      case 'joined': return myJoined;
      case 'completed': return myCompleted;
      case 'saved': return savedProjects;
      default: return myAll;
    }
  };

  const displayedProjects = getDisplayedProjects();

  return (
    <div className="container my-projects-page">
      <div className="page-header flex-header">
        <div>
          <span className="section-subtitle">PROJECT DASHBOARD</span>
          <h1 className="page-title">My Projects</h1>
          <p className="page-subtitle">Manage projects you created, teams you joined, and saved bookmarks (Redux Toolkit).</p>
        </div>

        <Link to="/create-project">
          <Button variant="copper" icon={PlusCircle}>
            Create New Project
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="my-projects-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Projects ({myAll.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved / Bookmarked ({savedProjects.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'created' ? 'active' : ''}`}
          onClick={() => setActiveTab('created')}
        >
          Created ({myCreated.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'joined' ? 'active' : ''}`}
          onClick={() => setActiveTab('joined')}
        >
          Joined ({myJoined.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({myCompleted.length})
        </button>
      </div>

      {/* Projects Grid or Empty State */}
      {displayedProjects.length > 0 ? (
        <div className="grid-3">
          {displayedProjects.map(proj => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <FolderKanban size={48} className="empty-state-icon" />
          <h3 className="empty-state-title">No projects found in this category</h3>
          <p className="empty-state-desc">
            {activeTab === 'created'
              ? "You haven't created any student projects yet."
              : activeTab === 'joined'
              ? "You haven't joined any classmate projects yet."
              : activeTab === 'saved'
              ? "You haven't saved any projects yet. Click the bookmark icon on any project card to save it using Redux Toolkit!"
              : "No projects match your current tab selection."}
          </p>
          <Link to={activeTab === 'saved' ? "/explore" : "/create-project"}>
            <Button variant="copper">{activeTab === 'saved' ? "Explore Projects to Bookmark" : "Create Your First Project"}</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
