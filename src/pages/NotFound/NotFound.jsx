import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="container not-found-page">
      <div className="not-found-card card">
        <div className="not-found-icon">
          <AlertTriangle size={52} />
        </div>
        <h1>404 — Page Not Found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/">
          <Button variant="copper" icon={Home} size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
