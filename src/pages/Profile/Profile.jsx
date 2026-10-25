import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Award, Clock, Mail, Edit, Save, Check, FolderKanban } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import './Profile.css';

export const Profile = () => {
  const { id } = useParams();
  const { currentUser, users, projects, updateProfile } = useContext(AppContext);

  // Determine targeted profile
  const targetUser = id ? users.find(u => u.id === id) || currentUser : currentUser;
  const isSelf = !id || (currentUser && targetUser?.id === currentUser?.id);

  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

  // Form state for self-editing
  const [editForm, setEditForm] = useState({
    name: targetUser?.name || '',
    phone: targetUser?.phone || '9876543210',
    course: targetUser?.course || '',
    year: targetUser?.year || '',
    bio: targetUser?.bio || '',
    skills: (targetUser?.skills || []).join(', '),
    interests: (targetUser?.interests || []).join(', '),
    availability: targetUser?.availability || '10 hrs/week'
  });

  if (!targetUser) {
    return (
      <div className="container profile-page">
        <div className="empty-state card">
          <h2>Profile Not Found</h2>
          <Link to="/explore"><Button variant="copper">Back to Explore</Button></Link>
        </div>
      </div>
    );
  }

  // Filter projects associated with target user
  const userProjects = projects.filter(p =>
    p.ownerId === targetUser.id || p.members.some(m => m.id === targetUser.id)
  );

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const skillsArray = editForm.skills.split(',').map(s => s.trim()).filter(Boolean);
    const interestsArray = editForm.interests.split(',').map(i => i.trim()).filter(Boolean);

    updateProfile({
      name: editForm.name,
      phone: editForm.phone,
      course: editForm.course,
      year: editForm.year,
      bio: editForm.bio,
      availability: editForm.availability,
      skills: skillsArray,
      interests: interestsArray
    });

    setIsEditing(false);
  };

  return (
    <div className="container profile-page">
      {/* Profile Header Banner */}
      <div className="profile-header-card card">
        <div className="profile-banner-top" />
        <div className="profile-header-content">
          <div className="profile-avatar-wrap">
            <img
              src={targetUser.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=MananshBoy&backgroundColor=b6e3f4"}
              alt={targetUser.name}
              className="profile-avatar"
            />
          </div>

          <div className="profile-main-info">
            <div className="profile-title-row">
              <h1 className="profile-name">{targetUser.name}</h1>
              {isSelf && !isEditing && (
                <Button variant="outline" size="sm" icon={Edit} onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>

            <p className="profile-course">{targetUser.course} • {targetUser.year}</p>

            <div className="profile-badges-row">
              <span className="badge badge-evergreen">
                <Award size={13} /> {targetUser.experienceLevel || 'Intermediate'}
              </span>
              <span className="badge badge-copper">
                <Clock size={13} /> {targetUser.availability || '10 hrs/week'}
              </span>
              <span className="badge badge-tech">
                <Mail size={13} /> {targetUser.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editing Mode */}
      {isSelf && isEditing ? (
        <div className="card edit-profile-card">
          <div className="section-header-flex">
            <h2>Edit Profile Information</h2>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>

          <form onSubmit={handleSaveProfile} className="edit-profile-form">
            <div className="grid-2">
              <Input
                label="Full Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                isNameInput={true}
                helperText="Letters only (numbers disallowed)."
                required
              />
              <Input
                label="Mobile Number (Indian 10-digit)"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                isPhoneInput={true}
                helperText="Exactly 10 digits (e.g. 9876543210)."
                required
              />
            </div>

            <div className="grid-2">
              <Input
                label="Course / Branch"
                value={editForm.course}
                onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                required
              />
              <Input
                label="Year of Study"
                type="select"
                value={editForm.year}
                onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                options={['1st Year', '2nd Year', '3rd Year', '4th Year']}
              />
            </div>

            <Input
              label="Availability"
              value={editForm.availability}
              onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })}
              placeholder="e.g. 10-15 hrs/week"
            />

            <Input
              label="Bio"
              type="textarea"
              value={editForm.bio}
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              rows={3}
            />

            <Input
              label="Skills (comma separated)"
              value={editForm.skills}
              onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
            />

            <Input
              label="Interests (comma separated)"
              value={editForm.interests}
              onChange={(e) => setEditForm({ ...editForm, interests: e.target.value })}
            />

            <div className="form-actions">
              <Button type="submit" variant="copper" icon={Save}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      ) : (
        /* Normal View Tabs */
        <div className="profile-tabs-container">
          <div className="profile-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              Skills & Interests
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects ({userProjects.length})
            </button>
          </div>

          <div className="tab-content card">
            {activeTab === 'about' && (
              <div className="tab-pane">
                <h3>About Student</h3>
                <p className="profile-bio-text">{targetUser.bio}</p>
                <div className="profile-details-list">
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span>{targetUser.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span>{targetUser.phone ? `+91 ${targetUser.phone}` : 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Course:</span>
                    <span>{targetUser.course}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Year:</span>
                    <span>{targetUser.year}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Weekly Availability:</span>
                    <span>{targetUser.availability || '10 hrs/week'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="tab-pane">
                <h3>Skills & Competencies</h3>
                <div className="tags-flex margin-bottom-lg">
                  {(targetUser.skills || []).map((skill, i) => (
                    <span key={i} className="badge badge-tech">{skill}</span>
                  ))}
                </div>

                <h3>Project Interests</h3>
                <div className="tags-flex">
                  {(targetUser.interests || []).map((int, i) => (
                    <span key={i} className="badge badge-copper">{int}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="tab-pane">
                {userProjects.length > 0 ? (
                  <div className="grid-2">
                    {userProjects.map(p => (
                      <ProjectCard key={p.id} project={p} />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <FolderKanban size={36} className="empty-state-icon" />
                    <p>No projects associated with this student yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
