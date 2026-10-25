import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowLeft, Check } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import './CreateProject.css';

export const CreateProject = () => {
  const { addProject } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Education',
    technologies: 'React, JavaScript, CSS3',
    requiredSkills: 'UI Design, Frontend Dev',
    teamSize: 4,
    difficulty: 'Intermediate',
    goal: '',
    additionalInfo: ''
  });

  const [error, setError] = useState('');

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      setError('Please fill in the project title and description.');
      return;
    }

    const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const skillsArray = formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean);

    const projectPayload = {
      ...formData,
      technologies: techArray.length > 0 ? techArray : ['React', 'JavaScript'],
      requiredSkills: skillsArray.length > 0 ? skillsArray : ['UI/UX Design']
    };

    const newId = addProject(projectPayload);
    navigate(`/project/${newId}`);
  };

  return (
    <div className="container create-project-page">
      <div className="create-project-card card">
        <div className="create-header">
          <div className="create-icon">
            <PlusCircle size={28} />
          </div>
          <div>
            <h1 className="page-title">Create a New Student Project</h1>
            <p className="page-subtitle">Publish your project idea, describe required roles, and find motivated teammates.</p>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="create-project-form">
          <Input
            label="Project Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. AI Study Assistant, Smart Campus Map"
            required
          />

          <Input
            label="Short Description"
            type="textarea"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Explain the problem your project solves and its core features..."
            rows={4}
            required
          />

          <div className="grid-2">
            <Input
              label="Category"
              type="select"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              options={['Education', 'Campus Life', 'Health & Fitness', 'Productivity', 'General']}
            />

            <Input
              label="Difficulty Rating"
              type="select"
              value={formData.difficulty}
              onChange={(e) => handleChange('difficulty', e.target.value)}
              options={['Beginner', 'Intermediate', 'Advanced']}
            />
          </div>

          <div className="grid-2">
            <Input
              label="Technologies Used (comma separated)"
              value={formData.technologies}
              onChange={(e) => handleChange('technologies', e.target.value)}
              placeholder="e.g. React, JavaScript, HTML5, CSS Grid"
            />

            <Input
              label="Target Team Size"
              type="select"
              value={formData.teamSize}
              onChange={(e) => handleChange('teamSize', e.target.value)}
              options={[2, 3, 4, 5, 6]}
            />
          </div>

          <Input
            label="Required Roles & Skills (comma separated)"
            value={formData.requiredSkills}
            onChange={(e) => handleChange('requiredSkills', e.target.value)}
            placeholder="e.g. Frontend Dev, UI/UX Designer, Python Backend"
          />

          <Input
            label="Project Main Goal"
            value={formData.goal}
            onChange={(e) => handleChange('goal', e.target.value)}
            placeholder="e.g. Deliver a working web app prototype."
          />

          <Input
            label="Additional Notes / Expectations"
            type="textarea"
            value={formData.additionalInfo}
            onChange={(e) => handleChange('additionalInfo', e.target.value)}
            placeholder="Specify weekly commitment expectations, meeting schedules, etc."
            rows={3}
          />

          <div className="form-buttons-row">
            <Button type="button" variant="outline" onClick={() => navigate('/my-projects')} icon={ArrowLeft}>
              Cancel
            </Button>
            <Button type="submit" variant="copper" icon={Check} size="lg">
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
