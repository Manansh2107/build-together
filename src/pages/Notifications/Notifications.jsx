import React, { useContext, useState } from 'react';
import { Bell, CheckCheck, Inbox } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { NotificationItem } from '../../components/NotificationItem/NotificationItem';
import { Button } from '../../components/Button/Button';
import './Notifications.css';

export const Notifications = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useContext(AppContext);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const displayedNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  return (
    <div className="container notifications-page">
      <div className="page-header flex-header">
        <div>
          <span className="section-subtitle">UPDATES & ALERTS</span>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Stay informed about team invitations, task updates, and project progress.</p>
        </div>

        {unreadCount > 0 && (
          <Button variant="outline" size="sm" icon={CheckCheck} onClick={markAllNotificationsRead}>
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="notif-tabs">
        <button
          type="button"
          className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications Stack or Empty State */}
      {displayedNotifications.length > 0 ? (
        <div className="notifications-stack">
          {displayedNotifications.map(n => (
            <NotificationItem
              key={n.id}
              notification={n}
              onMarkRead={markNotificationRead}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <Inbox size={44} className="empty-state-icon" />
          <h3 className="empty-state-title">No notifications here</h3>
          <p className="empty-state-desc">You are all caught up! There are no unread alerts at this time.</p>
        </div>
      )}
    </div>
  );
};
