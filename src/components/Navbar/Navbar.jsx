import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Layers, Bell, User, LogOut, Menu, X, PlusCircle, Bookmark, Lock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectSavedBookmarksCount } from '../../store/slices/bookmarksSlice';
import { AppContext } from '../../context/AppContext';
import { Button } from '../Button/Button';
import './Navbar.css';

export const Navbar = () => {
  const { currentUser, notifications, logoutUser } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const savedBookmarksCount = useSelector(selectSavedBookmarksCount);
  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  const handleLogout = () => {
    logoutUser();
    navigate('/how-it-works');
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to={currentUser ? "/" : "/how-it-works"} className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand-text">BUILD <strong>TOGETHER</strong></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links desktop-only">
          <NavLink to="/how-it-works" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            How It Works
          </NavLink>
          {currentUser ? (
            <>
              <NavLink to="/explore" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Explore Projects
              </NavLink>
              <NavLink to="/find-teammates" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Find Teammates
              </NavLink>
              <NavLink to="/my-projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                My Projects
              </NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Dashboard
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/explore" className="nav-link nav-link-locked" title="Sign In Required to Explore Projects">
                <Lock size={13} style={{ marginRight: '4px', verticalAlign: '-1px' }} />
                Explore Projects
              </NavLink>
              <NavLink to="/find-teammates" className="nav-link nav-link-locked" title="Sign In Required to Find Teammates">
                <Lock size={13} style={{ marginRight: '4px', verticalAlign: '-1px' }} />
                Find Teammates
              </NavLink>
            </>
          )}
        </nav>

        {/* Action Buttons & User Menu */}
        <div className="navbar-actions desktop-only">
          {currentUser ? (
            <>
              <Link to="/create-project">
                <Button variant="copper" size="sm" icon={PlusCircle}>
                  Create Project
                </Button>
              </Link>

              <Link to="/my-projects?tab=saved" className="notif-btn" title="Saved Projects">
                <Bookmark size={20} />
                {savedBookmarksCount > 0 && <span className="notif-badge">{savedBookmarksCount}</span>}
              </Link>

              <Link to="/notifications" className="notif-btn" title="Notifications">
                <Bell size={20} />
                {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
              </Link>

              <div className="user-profile-menu">
                <Link to="/profile">
                  <img
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"}
                    alt={currentUser.name}
                    className="nav-avatar"
                  />
                </Link>
                <button type="button" onClick={handleLogout} className="logout-icon-btn" title="Sign Out">
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button variant="copper" size="sm">
                  Start Building
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-toggle mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer mobile-only">
          <nav className="mobile-nav">
            <NavLink to="/how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</NavLink>
            {currentUser ? (
              <>
                <NavLink to="/explore" onClick={() => setMobileMenuOpen(false)}>Explore Projects</NavLink>
                <NavLink to="/find-teammates" onClick={() => setMobileMenuOpen(false)}>Find Teammates</NavLink>
                <NavLink to="/my-projects" onClick={() => setMobileMenuOpen(false)}>My Projects</NavLink>
                <NavLink to="/my-projects?tab=saved" onClick={() => setMobileMenuOpen(false)}>Saved Projects ({savedBookmarksCount})</NavLink>
                <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>
                <NavLink to="/create-project" onClick={() => setMobileMenuOpen(false)}>+ Create Project</NavLink>
                <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>My Profile</NavLink>
                <NavLink to="/notifications" onClick={() => setMobileMenuOpen(false)}>Notifications ({unreadCount})</NavLink>
                <NavLink to="/settings" onClick={() => setMobileMenuOpen(false)}>Settings</NavLink>
                <button type="button" onClick={handleLogout} className="mobile-logout-btn">
                  Sign Out ({currentUser.name})
                </button>
              </>
            ) : (
              <>
                <NavLink to="/explore" onClick={() => setMobileMenuOpen(false)}>
                  🔒 Explore Projects (Sign In Required)
                </NavLink>
                <NavLink to="/find-teammates" onClick={() => setMobileMenuOpen(false)}>
                  🔒 Find Teammates (Sign In Required)
                </NavLink>
                <div className="mobile-auth-btns">
                  <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth>Sign In</Button>
                  </Link>
                  <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="copper" fullWidth>Start Building</Button>
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
