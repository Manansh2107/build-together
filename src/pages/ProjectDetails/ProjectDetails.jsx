import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Code, Calendar, Target, UserPlus, CheckCircle, FolderKanban, Bookmark } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark, selectSavedProjectIds } from '../../store/slices/bookmarksSlice';
import { AppContext } from '../../context/AppContext';
import { Button } from '../../components/Button/Button';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Modal } from '../../components/Modal/Modal';
import './ProjectDetails.css';

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedProjectIds = useSelector(selectSavedProjectIds);
  const isBookmarked = savedProjectIds.includes(id);

  const { projects, currentUser, joinProjectRequest } = useContext(AppContext);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="container project-details-page">
        <div className="empty-state card">
          <h2>Project Not Found</h2>
          <p>The project with ID "{id}" could not be found.</p>
          <Link to="/explore">
            <Button variant="copper">Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    category,
    technologies = [],
    difficulty,
    teamSize,
    members = [],
    requiredSkills = [],
    status,
    progress = 0,
    ownerName,
    ownerId,
    createdAt,
    goal,
    additionalInfo
  } = project;

  const isMember = currentUser && members.some(m => m.id === currentUser.id);
  const isOwner = currentUser && ownerId === currentUser.id;

  const handleJoinRequest = () => {
    joinProjectRequest(project.id);
    setShowJoinModal(true);
  };

  return (
    <div className="container project-details-page">
      {/* Back Button */}
      <div className="details-nav-back">
        <Link to="/explore">
          <Button variant="ghost" size="sm" icon={ArrowLeft}>
            Back to Explore
          </Button>
        </Link>
      </div>

      <div className="details-header-card card">
        <div className="details-header-main">
          <div className="details-badges">
            <span className="badge badge-evergreen">{category}</span>
            <span className="badge badge-copper">{difficulty}</span>
            <span className="badge badge-open">{status}</span>
          </div>

          <h1 className="details-title">{title}</h1>
          <p className="details-owner-info">
            Created by <strong>{ownerName}</strong> • Posted on {createdAt || 'Sep 2026'}
          </p>
        </div>

        <div className="details-header-actions">
          <Button
            variant={isBookmarked ? "primary" : "outline"}
            size="lg"
            icon={Bookmark}
            onClick={() => dispatch(toggleBookmark(project.id))}
          >
            {isBookmarked ? "Saved (Redux)" : "Save Project (Redux)"}
          </Button>

          {isMember ? (
            <Link to={`/projects/${project.id}`}>
              <Button variant="copper" size="lg" icon={FolderKanban}>
                Open Workspace
              </Button>
            </Link>
          ) : (
            <Button variant="copper" size="lg" icon={UserPlus} onClick={handleJoinRequest}>
              Request to Join Team
            </Button>
          )}
        </div>
      </div>

      <div className="details-grid grid-3">
        {/* Main Details (Left 2 cols) */}
        <div className="details-main-content">
          <div className="details-section card">
            <h3>Project Overview</h3>
            <p className="details-text">{description}</p>
          </div>

          {goal && (
            <div className="details-section card">
              <h3>
                <Target size={18} className="icon-copper" /> Project Goal
              </h3>
              <p className="details-text">{goal}</p>
            </div>
          )}

          <div className="details-section card">
            <h3>Technologies & Required Skills</h3>
            <div className="skills-group">
              <span className="group-label">Technologies Used:</span>
              <div className="tags-flex">
                {technologies.map((tech, i) => (
                  <span key={i} className="badge badge-tech">{tech}</span>
                ))}
              </div>
            </div>

            <div className="skills-group">
              <span className="group-label">Roles & Skills Needed:</span>
              <div className="tags-flex">
                {requiredSkills.map((skill, i) => (
                  <span key={i} className="badge badge-copper">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {additionalInfo && (
            <div className="details-section card">
              <h3>Additional Information</h3>
              <p className="details-text">{additionalInfo}</p>
            </div>
          )}
        </div>

        {/* Sidebar Info (Right 1 col) */}
        <div className="details-sidebar">
          {/* Progress Card */}
          <div className="card side-card">
            <h4>Project Progress</h4>
            <ProgressBar progress={progress} size="lg" />
            <span className="side-progress-caption">
              Completion percentage calculated dynamically from completed team tasks.
            </span>
          </div>

          {/* Team Members Card */}
          <div className="card side-card">
            <div className="side-card-header">
              <h4>Team Roster</h4>
              <span className="badge badge-evergreen">{members.length} / {teamSize}</span>
            </div>

            <div className="members-list">
              {members.map((m, i) => (
                <div key={i} className="member-row">
                  <img
                    src={m.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"}
                    alt={m.name}
                    className="member-row-avatar"
                  />
                  <div className="member-row-info">
                    <span className="member-name">{m.name}</span>
                    <span className="member-role">{m.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Join Request Confirmation Modal */}
      <Modal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        title="Join Request Sent!"
      >
        <div className="modal-join-confirm">
          <CheckCircle size={44} className="icon-success" />
          <p>
            You have successfully requested to join <strong>{title}</strong>! You are now added to the project roster and can access the project workspace.
          </p>
          <div className="modal-actions">
            <Button variant="copper" onClick={() => navigate(`/projects/${project.id}`)}>
              Go to Workspace
            </Button>
            <Button variant="outline" onClick={() => setShowJoinModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
