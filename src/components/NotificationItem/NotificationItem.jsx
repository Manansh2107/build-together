import React from 'react';
import { Bell, Check, Users, FileCheck, Info } from 'lucide-react';
import './NotificationItem.css';

export const NotificationItem = ({ notification, onMarkRead }) => {
  const { id, title, message, timestamp, read, type } = notification;

  const getIcon = () => {
    switch (type) {
      case 'invite': return <Users size={18} className="notif-icon icon-invite" />;
      case 'task': return <FileCheck size={18} className="notif-icon icon-task" />;
      case 'project': return <Bell size={18} className="notif-icon icon-project" />;
      default: return <Info size={18} className="notif-icon icon-info" />;
    }
  };

  return (
    <div className={`notification-item ${read ? 'read' : 'unread'}`}>
      <div className="notif-left">
        {getIcon()}
        <div className="notif-details">
          <div className="notif-title-row">
            <h4 className="notif-title">{title}</h4>
            {!read && <span className="unread-dot" title="Unread notification" />}
          </div>
          <p className="notif-message">{message}</p>
          <span className="notif-time">{timestamp}</span>
        </div>
      </div>

      {!read && (
        <button
          type="button"
          className="mark-read-btn"
          onClick={() => onMarkRead(id)}
          title="Mark as read"
        >
          <Check size={16} /> Mark Read
        </button>
      )}
    </div>
  );
};
