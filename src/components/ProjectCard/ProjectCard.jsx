import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Code, ArrowRight } from 'lucide-react';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Button } from '../Button/Button';
import './ProjectCard.css';

export const ProjectCard = ({ project }) => {
  const {
    id,
    title,
    description,
    category,
    technologies = [],
    difficulty,
    teamSize,
    members = [],
    status,
    progress = 0
  } = project;

  const statusClass = status === 'Open' ? 'badge-open' : status === 'In Progress' ? 'badge-in-progress' : 'badge-completed';

  return (
    <div className="card project-card">
      <div className="project-card-header">
        <span className="badge badge-evergreen">{category}</span>
        <span className={`badge ${statusClass}`}>{status}</span>
      </div>

      <h3 className="project-card-title">{title}</h3>
      <p className="project-card-desc">{description}</p>

      <div className="project-card-techs">
        {technologies.slice(0, 4).map((tech, index) => (
          <span key={index} className="badge badge-tech">
            {tech}
          </span>
        ))}
        {technologies.length > 4 && (
          <span className="badge badge-tech">+{technologies.length - 4}</span>
        )}
      </div>

      <div className="project-card-meta">
        <div className="meta-item">
          <Users size={15} />
          <span>{members.length} / {teamSize} Members</span>
        </div>
        <div className="meta-item">
          <Code size={15} />
          <span>{difficulty}</span>
        </div>
      </div>

      <div className="project-card-progress">
        <div className="progress-header">
          <span>Completion Progress</span>
        </div>
        <ProgressBar progress={progress} size="sm" />
      </div>

      <div className="project-card-footer">
        <div className="members-avatars">
          {members.slice(0, 3).map((m, i) => (
            <img
              key={i}
              src={m.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=MananshBoy&backgroundColor=b6e3f4"}
              alt={m.name}
              title={`${m.name} (${m.role})`}
              className="member-avatar"
            />
          ))}
          {members.length > 3 && (
            <div className="avatar-more">+{members.length - 3}</div>
          )}
        </div>

        <Link to={`/project/${id}`}>
          <Button variant="outline" size="sm" icon={ArrowRight}>
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};
