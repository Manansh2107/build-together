import React from 'react';
import { Link } from 'react-router-dom';
import { User, Clock, Award } from 'lucide-react';
import { Button } from '../Button/Button';
import './UserCard.css';

export const UserCard = ({ user, onInvite = null }) => {
  const {
    id,
    name,
    avatar,
    course,
    year,
    bio,
    skills = [],
    experienceLevel = 'Intermediate',
    availability = '10 hrs/week'
  } = user;

  return (
    <div className="card user-card">
      <div className="user-card-header">
        <img
          src={avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=MananshBoy&backgroundColor=b6e3f4"}
          alt={name}
          className="user-card-avatar"
        />
        <div className="user-card-info">
          <h4 className="user-card-name">{name}</h4>
          <p className="user-card-course">{course} • {year}</p>
          <div className="user-card-badges">
            <span className="badge badge-evergreen">
              <Award size={12} /> {experienceLevel}
            </span>
            <span className="badge badge-copper">
              <Clock size={12} /> {availability}
            </span>
          </div>
        </div>
      </div>

      <p className="user-card-bio">{bio}</p>

      <div className="user-card-skills">
        <span className="skills-title">Skills & Technologies:</span>
        <div className="skills-list">
          {skills.slice(0, 5).map((skill, idx) => (
            <span key={idx} className="badge badge-tech">
              {skill}
            </span>
          ))}
          {skills.length > 5 && (
            <span className="badge badge-tech">+{skills.length - 5}</span>
          )}
        </div>
      </div>

      <div className="user-card-footer">
        <Link to={`/profile/${id}`}>
          <Button variant="outline" size="sm" icon={User}>
            View Profile
          </Button>
        </Link>
        {onInvite && (
          <Button variant="copper" size="sm" onClick={() => onInvite(user)}>
            Invite
          </Button>
        )}
      </div>
    </div>
  );
};
