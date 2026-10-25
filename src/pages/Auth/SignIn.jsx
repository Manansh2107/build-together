import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Sparkles, Github, Globe, Key, X, CheckCircle2, Lock } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import './Auth.css';

export const SignIn = () => {
  const { loginUser, loginWithProvider, resetPassword } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('manansh.goyal@university.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const isValidEmail = (str) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(str.trim());

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both your university email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address (e.g. student@university.edu).');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = loginUser(email, password);
      setIsLoading(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message || 'Invalid email or password.');
      }
    }, 400);
  };

  const handleProviderLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      loginWithProvider(provider);
      setIsLoading(false);
      navigate('/dashboard');
    }, 300);
  };

  const handleDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    setError('');
    const res = loginUser(demoEmail, 'password123');
    if (res.success) {
      navigate('/dashboard');
    }
  };

  const handleOpenForgot = (e) => {
    e.preventDefault();
    setForgotEmail(email);
    setNewPassword('');
    setForgotError('');
    setForgotSuccess('');
    setShowForgotModal(true);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (!forgotEmail.trim() || !newPassword) {
      setForgotError('Please enter your email and a new password.');
      return;
    }

    const res = resetPassword(forgotEmail, newPassword);
    if (res.success) {
      setForgotSuccess(res.message);
      setPassword(newPassword);
      setEmail(forgotEmail);
      setTimeout(() => {
        setShowForgotModal(false);
      }, 1500);
    } else {
      setForgotError(res.message);
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-icon-wrap">
            <LogIn size={24} />
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in with your university account to manage student projects.</p>
        </div>

        {error && <div className="alert alert-error auth-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="University Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@university.edu"
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            rightElement={
              <button
                type="button"
                className="input-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <div className="auth-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" onClick={handleOpenForgot} className="auth-forgot-link">
              Forgot password?
            </a>
          </div>

          <Button type="submit" variant="copper" fullWidth size="lg" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>

        <div className="social-divider">
          <span>or sign in with</span>
        </div>

        <div className="social-auth-btns">
          <button
            type="button"
            className="social-btn google-btn"
            onClick={() => handleProviderLogin('google')}
          >
            <Globe size={18} /> Google
          </button>
          <button
            type="button"
            className="social-btn github-btn"
            onClick={() => handleProviderLogin('github')}
          >
            <Github size={18} /> GitHub
          </button>
        </div>

        <div className="demo-accounts-box">
          <span className="demo-title">
            <Sparkles size={14} /> Quick Demo Accounts (Pass: <code>password123</code>):
          </span>
          <div className="demo-btns">
            <button type="button" onClick={() => handleDemoLogin('manansh.goyal@university.edu')} className="demo-chip">
              Manansh (Lead Dev)
            </button>
            <button type="button" onClick={() => handleDemoLogin('himanshu@university.edu')} className="demo-chip">
              Himanshu (Backend)
            </button>
            <button type="button" onClick={() => handleDemoLogin('shreyansh@university.edu')} className="demo-chip">
              Shreyansh (UI/UX)
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <span>Don't have an account? </span>
          <Link to="/sign-up">Create Account</Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="auth-modal-overlay">
          <div className="auth-modal-card card">
            <div className="auth-modal-header">
              <div className="auth-icon-wrap modal-icon">
                <Key size={20} />
              </div>
              <h3>Reset Password</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowForgotModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            {forgotError && <div className="alert alert-error">{forgotError}</div>}
            {forgotSuccess && <div className="alert alert-success">{forgotSuccess}</div>}

            <form onSubmit={handleResetSubmit} className="auth-form">
              <Input
                label="Registered University Email"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="student@university.edu"
                required
              />

              <Input
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 chars)"
                required
                rightElement={
                  <button
                    type="button"
                    className="input-toggle-btn"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              <div className="btn-group-row" style={{ marginTop: '1rem' }}>
                <Button type="button" variant="outline" onClick={() => setShowForgotModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="copper">
                  Reset Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
