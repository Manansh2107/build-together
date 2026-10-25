import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search projects by title, description, or keyword...",
  onClear
}) => {
  return (
    <div className="search-bar">
      <Search size={18} className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          className="search-clear-btn"
          title="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
