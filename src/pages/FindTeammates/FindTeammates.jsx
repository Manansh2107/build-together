import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { UserCard } from '../../components/UserCard/UserCard';
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { Users, Send, CheckCircle2 } from 'lucide-react';
import './FindTeammates.css';

export const FindTeammates = () => {
  const { users, projects, currentUser } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  // My created projects where I can invite teammates
  const myCreatedProjects = projects.filter(p => p.ownerId === currentUser?.id);

  // Filter students (exclude current user)
  const filteredUsers = users.filter(user => {
    if (user.id === currentUser?.id) return false;

    const matchesSearch =
      searchTerm.trim() === '' ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesExp = experienceFilter === 'All' || user.experienceLevel === experienceFilter;

    return matchesSearch && matchesExp;
  });

  const handleOpenInviteModal = (user) => {
    setSelectedStudent(user);
    if (myCreatedProjects.length > 0) {
      setSelectedProjectId(myCreatedProjects[0].id);
    }
    setInviteSent(false);
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    setInviteSent(true);
  };

  return (
    <div className="container find-teammates-page">
      <div className="page-header">
        <span className="section-subtitle">PEER DISCOVERY</span>
        <h1 className="page-title">Find Suitable Teammates</h1>
        <p className="page-subtitle">
          Search for fellow university students with skills in React, Python, UI Design, and backend development.
        </p>
      </div>

      {/* Search & Experience Filter */}
      <div className="teammates-controls">
        <div className="search-flex">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search students by name, course, or skill (e.g. React, Figma, Python)..."
          />
        </div>

        <div className="exp-filter">
          <label className="filter-label">Experience:</label>
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="results-count-bar">
        <span>Found <strong>{filteredUsers.length}</strong> available student collaborators</span>
      </div>

      {/* Student Cards Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid-3">
          {filteredUsers.map(student => (
            <UserCard
              key={student.id}
              user={student}
              onInvite={myCreatedProjects.length > 0 ? handleOpenInviteModal : null}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <Users size={48} className="empty-state-icon" />
          <h3 className="empty-state-title">No students found</h3>
          <p className="empty-state-desc">Try clearing your search term or selecting a different experience level.</p>
          <button type="button" onClick={() => { setSearchTerm(''); setExperienceFilter('All'); }} className="btn btn-copper btn-md">
            Reset Filters
          </button>
        </div>
      )}

      {/* Invite Modal */}
      <Modal
        isOpen={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
        title={inviteSent ? "Invitation Sent!" : `Invite ${selectedStudent?.name}`}
      >
        {!inviteSent ? (
          <form onSubmit={handleSendInvite} className="invite-modal-form">
            <p className="invite-desc">
              Select a project to invite <strong>{selectedStudent?.name}</strong> to join your team.
            </p>

            <div className="input-group">
              <label className="input-label">Select Project</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="input-element input-select"
                required
              >
                {myCreatedProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.title} ({p.category})</option>
                ))}
              </select>
            </div>

            <div className="modal-actions">
              <Button type="submit" variant="copper" icon={Send}>
                Send Invitation
              </Button>
              <Button type="button" variant="outline" onClick={() => setSelectedStudent(null)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="modal-join-confirm">
            <CheckCircle2 size={44} className="icon-success" />
            <p>
              An invitation to join <strong>{myCreatedProjects.find(p => p.id === selectedProjectId)?.title}</strong> has been sent to {selectedStudent?.name}!
            </p>
            <Button variant="copper" onClick={() => setSelectedStudent(null)}>
              Done
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
