import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand-col">
          <div className="footer-brand">
            <span>BUILD <strong>TOGETHER</strong></span>
          </div>
          <p className="footer-desc">
            A simple, polished student project collaboration platform enabling university students to discover projects, match with peers, and track progress together.
          </p>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-title">Platform</h4>
          <Link to="/">Home</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/explore">Explore Projects</Link>
          <Link to="/find-teammates">Find Teammates</Link>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-title">Student Hub</h4>
          <Link to="/create-project">Create Project</Link>
          <Link to="/my-projects">My Projects</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/notifications">Notifications</Link>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-title">About Platform</h4>
          <p className="footer-info">Computer Science Project</p>
          <p className="footer-info">Theme: Evergreen & Copper</p>
          <p className="footer-info">Stack: React + Vite + CSS</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>© {new Date().getFullYear()} BuildTogether. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
