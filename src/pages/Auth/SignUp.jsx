import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { UserPlus, ArrowRight, ArrowLeft, Check, Eye, EyeOff, Globe, Github } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import './Auth.css';

export const SignUp = () => {
  const { currentUser, signupUser, loginWithProvider, users } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  // If already logged in, redirect to homepage
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const from = location.state?.from?.pathname || '/';

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    course: 'Computer Science & Engineering',
    year: '2nd Year',
    bio: '',
    skills: 'React, JavaScript, HTML/CSS',
    interests: 'Web Apps, Open Source'
  });

  const [error, setError] = useState('');

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        setError('Please complete all account credentials.');
        return;
      }
      if (/\d/.test(formData.name)) {
        setError('Full Name cannot contain any numbers.');
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
        setError('Please enter a valid email address format (e.g. student@university.edu).');
        return;
      }
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        setError('Phone number must be exactly 10 digits (Indian mobile number format).');
        return;
      }
      if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
        setError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (confirmPassword && formData.password !== confirmPassword) {
        setError('Passwords do not match. Please check and try again.');
        return;
      }
      const existingUser = users.find(u => u.email.toLowerCase() === formData.email.trim().toLowerCase());
      if (existingUser) {
        setError('An account with this email address already exists. Please sign in instead.');
        return;
      }
    }
    if (step === 2) {
      if (!formData.course || !formData.bio) {
        setError('Please fill in your course details and short bio.');
        return;
      }
    }
    setError('');
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    const interestsArray = formData.interests.split(',').map(i => i.trim()).filter(Boolean);

    const payload = {
      ...formData,
      skills: skillsArray.length > 0 ? skillsArray : ['React', 'JavaScript'],
      interests: interestsArray.length > 0 ? interestsArray : ['Web Projects']
    };

    const res = signupUser(payload);
    if (res.success) {
      navigate('/', { replace: true });
    } else {
      setError(res.message || 'Error creating account.');
      setStep(1);
    }
  };

  const handleProviderSignUp = (provider) => {
    loginWithProvider(provider);
    navigate('/', { replace: true });
  };

  return (
    <div className="auth-page container">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-icon-wrap">
            <UserPlus size={24} />
          </div>
          <h1 className="auth-title">Create Student Account</h1>
          <p className="auth-subtitle">Join BuildTogether to discover projects & team up with peers.</p>

          {/* Multi-step indicator */}
          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${step >= 2 ? 'active' : ''}`} />
            <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step-line ${step >= 3 ? 'active' : ''}`} />
            <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>
          <span className="step-name">
            {step === 1 ? 'Step 1: Account Credentials' : step === 2 ? 'Step 2: Academic Profile' : 'Step 3: Skills & Interests'}
          </span>
        </div>

        {error && <div className="alert alert-error auth-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {step === 1 && (
            <>
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Manansh Goyal"
                isNameInput={true}
                helperText="Letters only (numbers disallowed)."
                required
              />
              <Input
                label="University Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="student@university.edu"
                required
              />
              <Input
                label="Mobile Number (Indian 10-digit)"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="e.g. 9876543210"
                isPhoneInput={true}
                helperText="Exactly 10 digits required (e.g. 9876543210)."
                required
              />
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="At least 6 characters"
                required
                rightElement={
                  <button
                    type="button"
                    className="input-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              <Input
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
              />
              <Button type="button" variant="copper" fullWidth size="lg" onClick={handleNext} icon={ArrowRight}>
                Next: Profile Details
              </Button>

              <div className="social-divider">
                <span>or quick join with</span>
              </div>

              <div className="social-auth-btns">
                <button
                  type="button"
                  className="social-btn google-btn"
                  onClick={() => handleProviderSignUp('google')}
                >
                  <Globe size={18} /> Google
                </button>
                <button
                  type="button"
                  className="social-btn github-btn"
                  onClick={() => handleProviderSignUp('github')}
                >
                  <Github size={18} /> GitHub
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <Input
                label="Course / Branch"
                value={formData.course}
                onChange={(e) => handleChange('course', e.target.value)}
                placeholder="e.g. Computer Science & Engineering"
                required
              />
              <Input
                label="Year of Study"
                type="select"
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                options={['1st Year', '2nd Year', '3rd Year', '4th Year']}
                required
              />
              <Input
                label="Short Bio"
                type="textarea"
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                placeholder="Tell classmates a bit about your project goals and interests..."
                rows={3}
                required
              />
              <div className="btn-group-row">
                <Button type="button" variant="outline" onClick={handlePrev} icon={ArrowLeft}>
                  Back
                </Button>
                <Button type="button" variant="copper" onClick={handleNext} icon={ArrowRight}>
                  Next: Skills
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <Input
                label="Skills (comma separated)"
                value={formData.skills}
                onChange={(e) => handleChange('skills', e.target.value)}
                placeholder="e.g. React, JavaScript, HTML/CSS, Figma"
                helperText="Separate skills with commas."
              />
              <Input
                label="Interests (comma separated)"
                value={formData.interests}
                onChange={(e) => handleChange('interests', e.target.value)}
                placeholder="e.g. Web Apps, AI Tools, Campus Apps"
                helperText="Separate interests with commas."
              />
              <div className="btn-group-row">
                <Button type="button" variant="outline" onClick={handlePrev} icon={ArrowLeft}>
                  Back
                </Button>
                <Button type="submit" variant="copper" icon={Check}>
                  Create Account
                </Button>
              </div>
            </>
          )}
        </form>

        <div className="auth-footer">
          <span>Already registered? </span>
          <Link to="/sign-in">Sign In</Link>
        </div>
      </div>
    </div>
  );
};
