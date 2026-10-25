import React, { useContext, useState } from 'react';
import { Settings as SettingsIcon, RotateCcw, Save, ShieldAlert, Check } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import './Settings.css';

export const Settings = () => {
  const { currentUser, updateProfile, resetDemoData } = useContext(AppContext);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePreferences = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm("Reset all browser localStorage demo data back to default initial values?")) {
      resetDemoData();
      alert("Local data has been restored to default state.");
    }
  };

  return (
    <div className="container settings-page">
      <div className="page-header">
        <span className="section-subtitle">PLATFORM PREFERENCES</span>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account preferences and browser localStorage state.</p>
      </div>

      {savedSuccess && <div className="alert alert-success">Preferences updated successfully!</div>}

      <div className="settings-grid card">
        <form onSubmit={handleSavePreferences} className="settings-form">
          <section className="settings-section">
            <h3>Notification Preferences</h3>
            <div className="setting-row">
              <div>
                <span className="setting-title">Email Notifications</span>
                <p className="setting-desc">Receive email summaries when team invitations arrive.</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="setting-toggle"
              />
            </div>

            <div className="setting-row">
              <div>
                <span className="setting-title">Task Reminders</span>
                <p className="setting-desc">Show notification badges for pending project tasks.</p>
              </div>
              <input
                type="checkbox"
                checked={taskReminders}
                onChange={(e) => setTaskReminders(e.target.checked)}
                className="setting-toggle"
              />
            </div>
          </section>

          <div className="form-actions">
            <Button type="submit" variant="copper" icon={Save}>
              Save Preferences
            </Button>
          </div>
        </form>

        <section className="settings-section danger-zone">
          <div className="danger-header">
            <ShieldAlert size={20} className="icon-error" />
            <h3>Demo Data Reset Tool</h3>
          </div>
          <p className="danger-desc">
            If you have added or modified projects/tasks during testing and want to reset all data back to the default dataset, click reset below.
          </p>

          <Button type="button" variant="danger" icon={RotateCcw} onClick={handleResetData}>
            Reset Demo Data (localStorage)
          </Button>
        </section>
      </div>
    </div>
  );
};
