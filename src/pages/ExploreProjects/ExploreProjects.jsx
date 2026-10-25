import React, { useState, useContext } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { AppContext } from '../../context/AppContext';
import { FolderSearch } from 'lucide-react';
import './ExploreProjects.css';

export const ExploreProjects = () => {
  const { projects } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Simple viva-safe JavaScript filtering logic
  const filteredProjects = projects.filter(proj => {
    // 1. Text Search matching title, description, category, or technologies
    const matchesSearch =
      searchTerm.trim() === '' ||
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

    // 2. Category Filter
    const matchesCategory = categoryFilter === 'All' || proj.category === categoryFilter;

    // 3. Difficulty Filter
    const matchesDifficulty = difficultyFilter === 'All' || proj.difficulty === difficultyFilter;

    // 4. Status Filter
    const matchesStatus = statusFilter === 'All' || proj.status === statusFilter;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setDifficultyFilter('All');
    setStatusFilter('All');
  };

  return (
    <div className="container explore-page">
      <div className="page-header">
        <span className="section-subtitle">DISCOVER STUDENT IDEAS</span>
        <h1 className="page-title">Explore Projects</h1>
        <p className="page-subtitle">
          Find student projects looking for teammates across various technologies and skill levels.
        </p>
      </div>

      {/* Search Bar */}
      <div className="explore-search-wrap">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by project name, tech stack (e.g. React, Python), or keywords..."
        />
      </div>

      {/* Filters Bar */}
      <FilterBar
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        difficulty={difficultyFilter}
        onDifficultyChange={setDifficultyFilter}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        onReset={handleResetFilters}
      />

      {/* Results Header */}
      <div className="results-count-bar">
        <span>Showing <strong>{filteredProjects.length}</strong> of <strong>{projects.length}</strong> student projects</span>
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length > 0 ? (
        <div className="grid-3">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <FolderSearch size={48} className="empty-state-icon" />
          <h3 className="empty-state-title">No matching projects found</h3>
          <p className="empty-state-desc">
            We couldn't find any student projects matching your current search criteria. Try adjusting your filters.
          </p>
          <button type="button" onClick={handleResetFilters} className="btn btn-copper btn-md">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
