import React from 'react';
import { CheckCircle2, Circle, Trash2, User } from 'lucide-react';
import './TaskCard.css';

export const TaskCard = ({ task, onToggleStatus, onDelete }) => {
  const { id, title, status, priority, assignee } = task;
  const isCompleted = status === 'completed';

  const priorityClass = priority === 'High' ? 'priority-high' : priority === 'Medium' ? 'priority-medium' : 'priority-low';

  return (
    <div className={`task-card ${isCompleted ? 'task-completed' : ''}`}>
      <button
        type="button"
        className="task-checkbox"
        onClick={() => onToggleStatus(id)}
        aria-label={isCompleted ? "Mark task incomplete" : "Mark task complete"}
      >
        {isCompleted ? (
          <CheckCircle2 size={20} className="check-icon checked" />
        ) : (
          <Circle size={20} className="check-icon unchecked" />
        )}
      </button>

      <div className="task-content">
        <span className={`task-title ${isCompleted ? 'line-through' : ''}`}>
          {title}
        </span>
        <div className="task-meta">
          <span className={`task-priority ${priorityClass}`}>
            {priority} Priority
          </span>
          {assignee && (
            <span className="task-assignee">
              <User size={13} /> {assignee}
            </span>
          )}
        </div>
      </div>

      {onDelete && (
        <button
          type="button"
          className="task-delete-btn"
          onClick={() => onDelete(id)}
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};
