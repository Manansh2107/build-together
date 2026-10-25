import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import './FilterBar.css';

export const FilterBar = ({
  category = 'All',
  onCategoryChange,
  difficulty = 'All',
  onDifficultyChange,
  status = 'All',
  onStatusChange,
  onReset
}) => {
  const categories = ['All', 'Education', 'Campus Life', 'Health & Fitness', 'Productivity', 'General'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const statuses = ['All', 'Open', 'In Progress', 'Completed'];

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <Filter size={16} className="filter-title-icon" />
        <span className="filter-title">Filters:</span>
      </div>

      <div className="filter-controls">
        <div className="filter-item">
          <label className="filter-label">Category</label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="filter-select"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label className="filter-label">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="filter-select"
          >
            {difficulties.map((diff, i) => (
              <option key={i} value={diff}>{diff}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label className="filter-label">Status</label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="filter-select"
          >
            {statuses.map((stat, i) => (
              <option key={i} value={stat}>{stat}</option>
            ))}
          </select>
        </div>

        {(category !== 'All' || difficulty !== 'All' || status !== 'All') && (
          <button
            type="button"
            className="filter-reset-btn"
            onClick={onReset}
            title="Reset filters"
          >
            <RotateCcw size={14} /> Reset
          </button>
        )}
      </div>
    </div>
  );
};
